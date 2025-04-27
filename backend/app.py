import uuid
from flask import Flask, request,jsonify
from connect import supabase
from flask_cors import CORS
from dotenv import load_dotenv
import base64
import os
import openai
from test import create_task, poll_task_status, extract_model_url  # import functions from test.py
from flask import request, jsonify
app = Flask(__name__)
CORS(app)
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
            "full_name": "John Doe",
            "description": "Loves sustainable design and architecture.",
            "image_url": "https://randomuser.me/api/portraits/men/1.jpg"
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

    if not prompt:
        return {"error": "Prompt is required"}, 400
    try:
        #create a task with the prompt for the model generation
        task_data = {"prompt": prompt}
        task_id = create_task(task_data)

        if not task_id:
            return {"error": "Failed to create task"}, 500

        #poll task status
        task_result = poll_task_status(task_id)
        if not task_result:
            return jsonify({"error": "Failed to get task result"}), 500

        #extract model url from the task result
        model_url = extract_model_url(task_result)
        if not model_url:
            return jsonify({"error":"Model URL not found"}), 500
        
        return jsonify({"model_url": model_url})
    except Exception as e:
        return {"error": str(e)}, 500
        
        