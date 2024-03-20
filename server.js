const express = require("express");
const orderRoutes = require("./routes/order.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
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
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", restaurantRoutes);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
