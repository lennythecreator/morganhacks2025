import requests
import time
import json

API_KEY = "tsk_MRwfeuT7RQqCrt-ZONFnx5KvypeeFhSEFI34mcYArfo"
BASE_URL = "https://api.tripo3d.ai/v2/openapi/task"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

def create_task(data):
    """Create a task and return the task ID."""
    print("Creating task with data:", data)  # Debugging log
    response = requests.post(BASE_URL, headers=HEADERS, json=data)
    if response.status_code == 200:
        return response.json().get("data", {}).get("task_id")
    print(f"❌ Failed to create task. Status code: {response.status_code}, Response: {response.text}")
    return None

def poll_task_status(task_id, interval=2):
    """Poll task status until it is finalized and output is ready."""
    print(f"Polling task status for task_id: {task_id}")  # Debugging log
    url = f"{BASE_URL}/{task_id}"
    while True:
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 200:
            data = response.json()
            status = data.get("data", {}).get("status")
            progress = data.get("data", {}).get("progress")
            print(f"📦 Status: {status}, Progress: {progress}%")

            if status in ["success", "failed", "cancelled", "unknown"]:
                if status == "success":
                    time.sleep(2)
                    response = requests.get(url, headers=HEADERS)
                    if response.status_code == 200:
                        data = response.json()
                        print(json.dumps(data, indent=2))
                        return response.json()
                return data
        else:
            print(f"❌ Failed to fetch task status. Status code: {response.status_code}")
            return None
        
        time.sleep(interval)

def download_model(model_url, output_file="model.zip"):
    """Download the model from the given URL."""
    response = requests.get(model_url)
    if response.status_code == 200:
        with open(output_file, "wb") as f:
            f.write(response.content)
        print(f"✅ Model downloaded successfully as '{output_file}'")
    else:
        print(f"❌ Failed to download model. Status code: {response.status_code}")
        
def extract_model_url(task_result):
    """Extract the model URL from the task result."""
    output = task_result.get("data", {}).get("output", {})
    result = task_result.get("data", {}).get("result", {})

    model_url = output.get("pbr_model")
    if not model_url and result.get("pbr_model"):
        model_url = result["pbr_model"].get("url")

    return model_url
