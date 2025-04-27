import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import os

load_dotenv()

class S3Object:
    def __init__(self):
        self.s3Client = boto3.client('s3',
                                     aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                                     aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                                     region_name=os.getenv("AWS_DEFAULT_REGION"))

    def uploadToS3(self, file, key, mimetype):
        # Validate file type
        allowed_mimetypes = ['image/jpeg', 'image/png', 'image/gif', 'model/gltf-binary']
        if mimetype not in allowed_mimetypes:
            raise ValueError(f"Unsupported file type: {mimetype}")

        print(os.getenv("AWS_S3_BUCKET"))
        self.s3Client.upload_fileobj(file,
                                     os.getenv("AWS_S3_BUCKET"),
                                     key,
                                     ExtraArgs={'ACL': 'public-read', 'ContentType': mimetype})
        file_url = f"https://{os.getenv('AWS_S3_BUCKET')}.s3.{os.getenv('AWS_DEFAULT_REGION')}.amazonaws.com/{key}"

        return file_url

s3 = S3Object()
