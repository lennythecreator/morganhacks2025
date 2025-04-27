import uuid
from flask import Flask, request, jsonify
from connect import supabase
from flask_cors import CORS
from dotenv import load_dotenv
import boto3
from botocore.exceptions import ClientError
import base64
import os
import openai
import requests
from test_mannequin import create_task, poll_task_status, extract_model_url

load_dotenv()

app = Flask(__name__)
# Enable CORS properly for your frontend
CORS(app, resources={r"/*": {"origins":"*"}})

@app.route("/login", methods=["POST"])
def login():
    print("Login route was hit!")
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")

        # 1️⃣ Authenticate user via Supabase Auth
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if auth_response.user is None:
            return {"message": "Login failed: " + auth_response.error.message}, 401

        # 2️⃣ If login success, get user_id
        user_id = auth_response.user.id

        # 3️⃣ (Optional) Pull extra user info from your 'users' table if you want
        user_info = supabase.table("users").select("*").eq("user_id", user_id).single().execute()

        return {
            "message": "Login successful",
            "user_id": user_id,
            "full_name": user_info.data.get("full_name") if user_info.data else None,
        }

@app.route("/signup", methods=["POST"])
def signup():
    print("Signup route was hit!")
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        full_name = request.form.get("full_name")

        # 1️⃣ Register the user using Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        if auth_response.user is None:
            return {"message": "Signup failed: " + auth_response.error.message}, 400

        # 2️⃣ Get the newly created user's id
        user_id = auth_response.user.id  # ✅ This matches auth.users table!

        # 3️⃣ Insert into your 'users' table
        response = supabase.table("users").insert({
            "user_id": user_id,    # ✅ Now linked correctly
            "full_name": full_name,
            "password": password   # (you should hash it later!)
        }).execute()

        if response.data:
            return {"message": "User has been created", "user": response.data}
        else:
            return {"message": "User creation failed"}, 400


@app.route("/send-data", methods=["POST"])
def send_data():
    print("sent app data")

    dummy_data = [
        {
            "id": 1,
            "design_name": "John Doe",
            "description": "Loves sustainable design and architecture.",
            "design_url": "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            "id": 2,
            "full_name": "Jane Smith",
            "description": "Passionate about eco-friendly fashion.",
            "image_url": "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            "id": 3,
            "full_name": "Carlos Rivera",
            "description": "Engineer working on clean energy solutions.",
            "image_url": "https://randomuser.me/api/portraits/men/3.jpg"
        }
    ]

    return jsonify({
        "status": "success",
        "data": dummy_data
    })



@app.route("/gerenate_image", methods=["POST"])
def generate_image():
    data = request.get_json()
    prompt = data.get("prompt", "")
    references = data.get("references", [])  # Get references from the request

    if not prompt:
        return {"error": "Prompt is required"}, 400

    try:
        # Include references in the generation process if provided
        result = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            references=references  # Pass references to the model
        )
        image_base64 = result.data[0].b64_json
        return jsonify({"image_base64": image_base64})
    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/generate_model", methods=["POST"])
def generate_model():
    data = request.get_json()
    prompt = data.get("prompt","")
    print('HELLO THIS IS THE PROMPT', prompt)
    if not prompt:
        return {"error": "Prompt is required"}, 400
    try:
        # Create a task with the prompt for the model generation
        task_data = {"type": "text_to_model", "prompt": prompt}  # Specify task type
        task_id = create_task(task_data)

        if not task_id:
            return {"error": "Failed to create task"}, 500
            print("we were here")

        # Poll task status
        task_result = poll_task_status(task_id)
        if not task_result:
            return jsonify({"error": "Failed to get task result"}), 500


        model_url = extract_model_url(task_result)  # wherever the .glb is stored
        print('ffailed right before if not model_url', model_url)
        if not model_url:
            return jsonify({"error": "Model URL missing"}), 500

        print("model url", model_url)
        # 3. Download the .glb file
        response = requests.get(model_url, stream=True)
        print('this is our response', response)
        if response.status_code != 200:
            print('HEREEEEEEEEE')
            return jsonify({"error": "Failed to download model"}), 500

        # 5. Upload it to your S3 bucket
        filename = task_id # you can name it anything
        # Extract model URL from the task result
        print('over here question mark?, ', filename, response.raw)
        # Validate file type

        s3Client = boto3.client('s3',
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("AWS_DEFAULT_REGION"))
        print('We got this far',os.getenv("AWS_ACCESS_KEY_ID") )
        mimetype = "model/gltf-binary"
        allowed_mimetypes = ['image/jpeg', 'image/png', 'image/gif', 'model/gltf-binary',
            'application/octet-stream']
        print('We got this far')
        if mimetype not in allowed_mimetypes:
            print('we crashed here')
            raise ValueError(f"Unsupported file type: {mimetype}")
        key = f"uploads/{task_id}"
        print(os.getenv("AWS_S3_BUCKET"))
        model_url = s3Client.upload_fileobj(response.raw,
                                     os.getenv("AWS_S3_BUCKET"),
                                     key,
                                     ExtraArgs={'ACL': 'public-read', 'ContentType': mimetype})

        file_url = f"https://{os.getenv("AWS_S3_BUCKET")}.s3.{os.getenv('AWS_REGION')}.amazonaws.com/{key}"
        print('this is the file url', file_url)
        # Extract model URL from the task result
        # model_url = extract_model_url(task_result)
        # if not model_url:
        #     return jsonify({"error":"Model URL not found"}), 500
        
        return jsonify({"model_url": file_url, 'message': 'It works if your receive this your image shows up '}), 201
    except Exception as e:
        print("S3 upload error:", str(e))
        return {"error": f"S3 upload failed: {str(e)}"}, 500
@app.route("/edit_image", methods=["POST"])
def edit_image():
    data = request.get_json()
    image_base64 = data.get("image_base64", "")
    edits = data.get("edits", {})  # Details of the edits (e.g., crop, filter)

    if not image_base64:
        return {"error": "Image data is required"}, 400

    try:
        # Perform editing logic here (e.g., decode base64, apply edits, re-encode)
        edited_image_base64 = perform_edits(image_base64, edits)
        return jsonify({"edited_image_base64": edited_image_base64})
    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/upload-to-s3", methods=["POST"])
def upload_to_s3():
    """Endpoint to upload files (images or models) to S3."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    # Get additional metadata from the request
    file_type = request.form.get("type", "unknown")  # e.g., "model" or "image"
    mimetype = file.mimetype

    # Generate a unique key for the file in S3
    key = f"{file_type}/{file.filename}"

    try:
        # Upload the file to S3
        file_url = s3.uploadToS3(file, key, mimetype)
        return jsonify({"message": "File uploaded successfully", "file_url": file_url}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get-marketplace", methods=["GET"])
def get_marketplace():
    """Endpoint to fetch designs from the database for the marketplace."""
    try:
        # Log the request details
        print("Fetching marketplace designs...")

        # Fetch designs along with category and user details
        response = supabase.rpc("fetch_marketplace_designs").execute()

        # Log the response data
        print("Marketplace designs fetched:", response.data)

        if response.data:
            return jsonify({"status": "success", "data": response.data}), 200
        else:
            return jsonify({"status": "error", "message": "No designs found"}), 404
    except Exception as e:
        # Log the error
        print("Error fetching marketplace designs:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)