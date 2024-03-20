const mongoose = require("mongoose");

const { Schema } = mongoose;

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
});

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  address: addressSchema,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
