// routes/index.js
const express = require("express");
const { handleMessage } = require("../controllers/messageController");

const router = express.Router();

router.post("/ask", handleMessage);

module.exports = router;

