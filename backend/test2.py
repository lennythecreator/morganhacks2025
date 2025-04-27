from openai import OpenAI
import base64
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

prompt = """
A maniquin in a white shirt and black pants, standing in a modern office environment. The mannequin is posed in a confident stance, with one hand on its hip and the other holding a briefcase. The background features large windows with a city skyline view, and there are potted plants on either side of the mannequin. The lighting is bright and natural, creating a professional atmosphere.
"""

result = client.images.generate(
    model="gpt-image-1",
    prompt=prompt
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("otter.png", "wb") as f:
    f.write(image_bytes)