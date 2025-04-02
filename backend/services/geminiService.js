const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: "../.env" });

const API_KEY = process.env.API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "models/gemini-1.5-pro";

const geminiEndpoint = `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

async function callGemini(userMessage) {
  try {
    const payload = {
      contents: [{ parts: [{ text: userMessage }] }]
    };

    const response = await axios.post(geminiEndpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Gemini Response:", response.data);

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return `An error occurred: ${error.message}`;
  }
}

module.exports = { callGemini };
