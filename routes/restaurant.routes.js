const express = require("express");
const {
  addNewRestaurant,
  getAvailableRestaurants,
  getRestaurantWithID,
  getRestaurantMenuWithId,
  addNewMenuToRestaurantWithId,
  deleteMenuOfRestaurantWithId,
} = require("../controllers/restaurant.controllers");
const { auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

router
  .route("/restaurants")
  .post(addNewRestaurant)
  .get(getAvailableRestaurants);
router.route("/restaurants/:id").get(getRestaurantWithID);
router
  .route("/restaurants/:id/menu")
  .get(getRestaurantMenuWithId)
  .post(addNewMenuToRestaurantWithId);
router.route("/restaurants/:restaurantId/menu/:menuId").delete(deleteMenuOfRestaurantWithId);

module.exports = router;
