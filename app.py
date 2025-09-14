from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Load model
model = joblib.load("air_quality_model.pkl")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Only 5 features
        features = [
            float(data["pm10"]),
            float(data["no2"]),
            float(data["so2"]),
            float(data["o3"]),
            float(data["co"])
        ]

        prediction = model.predict([features])[0]
        return jsonify({"aqi": round(float(prediction), 2)})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
