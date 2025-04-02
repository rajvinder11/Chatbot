const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000; // Allow environment-based port configuration

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes from the routes directory
app.use("/api", routes); // Prefix API routes for better organization

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Chatbot API!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
