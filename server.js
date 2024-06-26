const express = require("express");
const swaggerUi = require("swagger-ui-express");
const connection = require("./connection");
const orderRoutes = require("./routes/order.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const userRoutes = require("./routes/user.routes");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./documentation.yaml");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// using express.json to get the json data
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Food Delivery App API!" });
});

// use all the routes
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", restaurantRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to mongoDB");
    console.log("listening on port", PORT);
  } catch (error) {
    console.error(error);
  }
});
