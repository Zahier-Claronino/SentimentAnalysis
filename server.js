// proxy-server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/analyse', async (req, res) => {
  const text = req.body.text;

  try {
    const response = await axios.post(
      'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/',
      new URLSearchParams({ text }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "twinword-sentiment-analysis.p.rapidapi.com"
        },
        maxRedirects: 0 // optional, but guards against infinite loops
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    res.status(500).json({ error: 'API call failed' });
  }
});

app.listen(3000, () => console.log('Proxy server running on http://localhost:3000'));