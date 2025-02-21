import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [text, setText] = useState(""); 
  const [sentiment, setSentiment] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  
  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError("Please enter some text!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:4000/analyze-sentiment", { text });
      setSentiment(response.data.sentiment);
    } catch (err) {
      setError("Failed to analyze sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Sentiment Analyzer</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <button onClick={analyzeSentiment} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Analyze Sentiment
      </button>

      {loading && <p>Analyzing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {sentiment && <h3>Sentiment: {sentiment}</h3>}
    </div>
  );
}

export default App;
