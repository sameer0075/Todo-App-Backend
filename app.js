// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
var cors = require("cors");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// corss-origin-allow-all
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sets default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Todo App" });
});

// app listens to defined port
app.listen(process.env.APP_PORT, () => {
  console.log("Backend server running on: " + process.env.APP_BASE_URL);
});
