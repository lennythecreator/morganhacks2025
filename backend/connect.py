import os
from supabase import create_client, Client

url = "https://yenbopozmpzchoyeqxih.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllbmJvcG96bXB6Y2hveWVxeGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MDY2ODIsImV4cCI6MjA2MTI4MjY4Mn0.H0ONceEmABmai7mOew8UZfkWRQx1RZXNJ7BWjIJg-fw"

# Initialize the client
supabase = create_client(url, key)

# Test function to verify connection
def test_connection():
    try:
        # Try a simple query that should always work if connection is valid
        response = supabase.table("users").select("count", count="exact").execute()
        print(f"Connection successful! Found {response.count} users.")
        return True
    except Exception as e:
        print(f"Connection error: {str(e)}")
        return False

# If this file is run directly, test the connection
if __name__ == "__main__":
    test_connection()