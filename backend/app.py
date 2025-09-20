
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://raechel:mtkpooja@cluster0.khzhoku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['civicai']
complaints_collection = db['complaints']

@app.route('/')
def home():
    return "Backend is working!"
@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.get_json(force=True)
    print("Received query:", data)
    return jsonify({"response": "Query received!"})
@app.route('/submit-complaint', methods=['POST'])
def submit_complaint():
    try:
        data = request.get_json(force=True)
        print("Received data:", data)

        # Extract expected fields
        issue = data.get('issue')
        place = data.get('place')
        description = data.get('description')

        # Basic validation
        if not issue or not place or not description:
            return jsonify({"error": "Missing required fields"}), 400

        # Create complaint document
        complaint = {
            "issue": issue,
            "place": place,
            "description": description
        }

        # Insert into MongoDB
        result = complaints_collection.insert_one(complaint)
        print("Inserted complaint ID:", result.inserted_id)

        return jsonify({"message": "Complaint submitted successfully!"}), 200

    except Exception as e:
        print("🔥 Error submitting complaint:", str(e))
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
    app.run(debug=True, port=5050,use_reloader=False)
