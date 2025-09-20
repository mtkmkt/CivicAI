
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import datetime
app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://raechel:mtkpooja@cluster0.khzhoku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['civicai']
complaints_collection = db['complaints']
print("Databases:", client.list_database_names())
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
        print("Received complaint:", data)

        # Extract fields from frontend
        category = data.get('category')
        issue = data.get('issue')
        place = data.get('location')
        description = data.get('description')

        # Basic validation
        if not category or not issue or not place or not description:
            return jsonify({"error": "Missing required fields"}), 400

        # Create complaint document
        complaint = {
            "category": category,
            "issue": issue,
            "place": place,
            "description": description,
            "timestamp": datetime.datetime.utcnow()
        }

        # Save to MongoDB
        result = complaints_collection.insert_one(complaint)
        print("Inserted ID:", result.inserted_id)

        return jsonify({"message": "Complaint submitted successfully!"}), 200

    except Exception as e:
        print("🔥 Error:", str(e))
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
