from flask import Flask
from dotenv import load_dotenv
import base64
import os
import openai
from test import create_task, poll_task_status, extract_model_url  # import functions from test.py
from flask import request, jsonify
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

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
        
        