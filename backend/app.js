const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const routes = require("./routes");
app.use(routes);

app.post("/ask", (req, res) => {
  const question = req.body.question;

  if (!question) {
      return res.status(400).json({ error: "Question is required." });
  }

  // Mock response (replace with your OpenAI logic or other backend functionality)
  res.json({ answer: `You asked: ${question}` });
});


app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/ask", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

const server = app.listen(PORT, function () {
  console.log(`Server running at http://127.0.0.1:${PORT}/ask`);
  exec(`open http://127.0.0.1:${PORT}/ask`);
});
