const express = require("express");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// using express.json to get the json data
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Food Delivery App API!" });
});

// use all the routes
app.get("/api", userRoutes);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
