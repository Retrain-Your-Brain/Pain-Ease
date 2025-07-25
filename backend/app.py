from flask import Flask, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from pymongo import MongoClient
import joblib

app = Flask(__name__)
from flask_cors import CORS
CORS(app)

client = MongoClient("mongodb+srv://navdishabhakri:7NNlNush0Ls8Uzcf@cluster0.zpctb21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]
collection = db["symptoms"]

@app.route("/check-pain", methods=["GET"])
def check_pain_trend():
    try:
        data = list(collection.find())
        if len(data) < 2:
            return jsonify({"message": "Not enough data"}), 400
        df = pd.DataFrame(data)
        df = df.drop(columns=["_id"])
        df = df.sort_values(by="date")
        df['prev_pain'] = df['painScale'].shift(1)
        df = df.dropna(subset=['prev_pain'])

        # Add pain increased flag
        df['pain_increased'] = (df['painScale'] > 6) & (df['painScale'] > df['prev_pain'])
        latest = df.iloc[-1]

        if latest['pain_increased']:
            latest_entry = collection.find_one(sort=[("date", -1)])
            collection.update_one(
                {"_id": latest_entry["_id"]},
                {"$set": {"suggestPlanChange": True}}
            )
            return jsonify({"suggestPlanChange": True, "message": "Pain has increased. Suggest plan update."}), 200

        return jsonify({"suggestPlanChange": False, "message": "No plan change needed."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
