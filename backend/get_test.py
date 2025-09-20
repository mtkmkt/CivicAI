import requests

url = "http://localhost:5050/get-complaints"

try:
    response = requests.get(url)
    print("Status Code:", response.status_code)

    try:
        print("Response JSON:", response.json())
    except Exception as json_error:
        print("❌ JSON Decode Error:", str(json_error))
        print("Raw Response:", response.text)

except requests.exceptions.RequestException as req_error:
    print("❌ Request Failed:", str(req_error))