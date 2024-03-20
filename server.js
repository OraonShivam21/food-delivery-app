const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Food Delivery App API!" });
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
