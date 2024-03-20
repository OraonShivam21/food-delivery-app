const Restaurant = require("../models/restaurant.models");

const addNewRestaurant = async (req, res) => {
  const payload = req.body;
  try {
    const restaurant = new Restaurant(payload);
    await restaurant.save();
    res.status(201).json({ message: "New restaurant has been added" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAvailableRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    if (restaurants.length < 0) throw "There are no restaurants to show";
    res.status(200).json({
      message: "This the list of available restaurants",
      available_restaurants: restaurants,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getRestaurantWithID = async (req, res) => {
  const id = req.params.id;
  try {
    const restaurantFound = await Restaurant.findById(id);
    if (!restaurantFound) throw "Restaurant not found";
    res.status(200).json({ restaurant: restaurantFound });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getRestaurantMenuWithId = async (req, res) => {
  const id = req.params.id;
  try {
    const restaurantFound = await Restaurant.findById(id);
    if (!restaurantFound) throw "Restaurant not found";
    res.status(200).json({ restaurant_menu: restaurantFound.menu });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addNewMenuToRestaurantWithId = async (req, res) => {
  const id = req.params.id;
  const newMenuItem = req.body;
  try {
    const restaurantFound = await Restaurant.findById(id);
    if (!restaurantFound) throw "Restaurant not found";

    restaurantFound.menu.push(newMenuItem);
    await restaurantFound.save();

    res
      .status(200)
      .json({ message: "Menu item successfully added", data: restaurantFound });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteMenuOfRestaurantWithId = async (req, res) => {
  const { restaurantId, menuId } = req.params;
  try {
    const restaurantFound = await Restaurant.findById(restaurantId);
    if (!restaurantFound) throw "Restaurant not found";

    restaurantFound.menu = restaurantFound.menu.filter(
      (item) => item._id.toString() !== menuId
    );
    await restaurantFound.save();
    res.status(202);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete menu item", error });
  }
};

module.exports = {
  addNewRestaurant,
  getAvailableRestaurants,
  getRestaurantWithID,
  getRestaurantMenuWithId,
  addNewMenuToRestaurantWithId,
  deleteMenuOfRestaurantWithId,
};
