from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS
import logging


app = Flask(__name__)
CORS(app)  
analyzer = SentimentIntensityAnalyzer()


logging.basicConfig(level=logging.INFO)

@app.route('/predict', methods=['POST'])
def predict_sentiment():
    """Predicts sentiment as positive, negative, or neutral."""
    data = request.get_json()

    if not data or "text" not in data:
        app.logger.error("Invalid request: No text provided")
        return jsonify({"error": "No text provided"}), 400

    text = data["text"].strip()

    if not text:
        app.logger.error("Empty text received")
        return jsonify({"error": "Empty text"}), 400


    scores = analyzer.polarity_scores(text)
    compound_score = scores["compound"]

    
    sentiment = "positive" if compound_score >= 0.05 else "negative" if compound_score <= -0.05 else "neutral"

    
    app.logger.info(f"Text: '{text}' | Sentiment: {sentiment}")

    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
