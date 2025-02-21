const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
app.use(express.json()); 
app.use(cors()); 
const PORT = 4000;


app.post('/analyze-sentiment', async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
   
    const flaskResponse = await axios.post('http://localhost:5000/predict', { text });

    return res.json(flaskResponse.data);
  } catch (error) {
    console.error('Error calling Flask API:', error.message);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
