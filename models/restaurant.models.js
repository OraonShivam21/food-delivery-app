const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const restaurantSchema = new Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  menu: [menuSchema],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
