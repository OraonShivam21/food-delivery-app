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
  .post(auth, addNewRestaurant)
  .get(getAvailableRestaurants);
router.route("/restaurants/:id").get(getRestaurantWithID);
router
  .route("/restaurants/:id/menu")
  .get(getRestaurantMenuWithId)
  .post(auth, addNewMenuToRestaurantWithId);
router
  .route("/restaurants/:restaurantId/menu/:menuId")
  .delete(auth, deleteMenuOfRestaurantWithId);

module.exports = router;
