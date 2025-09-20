
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://raechel:mtkpooja@cluster0.khzhoku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['civicai']
complaints_collection = db['complaints']

@app.route('/')
def home():
    return "Backend is working!"

@app.route('/submit-complaint', methods=['POST'])
def submit_complaint():
    try:
        data = request.get_json(force=True)
        print("Received data:", data)

        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        complaints_collection.insert_one(data)
        return jsonify({"message": "Complaint submitted successfully!"}), 200

    except Exception as e:
        print("🔥 Internal Server Error:", str(e))  # This will show the real issue
        return jsonify({"error": "Internal server error"}), 500
@app.route('/get-complaints', methods=['GET'])
def get_complaints():
    try:
        # Fetch all complaints from MongoDB
        complaints = list(complaints_collection.find({}, {'_id': 0}))  # Exclude MongoDB's internal _id field
        return jsonify({"complaints": complaints}), 200

    except Exception as e:
        print("🔥 Error fetching complaints:", str(e))
        return jsonify({"error": "Could not retrieve complaints"}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5050)
