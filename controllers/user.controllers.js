const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
require("dotenv").config();

const userRegister = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      throw "User has already been registered. Please proceed to login!";
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) throw err;
      const user = new User({ name, email, password: hash, address });
      await user.save();
      res.status(201).json({ message: "New user has been registered!" });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      throw "Email has not been registered. Please register first!";

    const result = await bcrypt.compare(password, userFound.password);
    if (!result) throw "Invalid credentials!";

    const accessToken = jwt.sign(
      { userID: userFound._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ message: "Successfully logged in!", accessToken });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const resetPassword = async (req, res) => {
  const userID = req.params.id;
  const { currentPassword, newPassword } = req.body;
  try {
    const userFound = await User.findById(userID);
    if (!userFound) throw "User not found";

    const passwordMatch = bcrypt.compare(currentPassword, userFound.password);
    if (!passwordMatch) throw "Incorrect current password";
    const hashedPassword = await bcrypt.hash(newPassword, 5);
    userFound.password = hashedPassword;
    await userFound.save();

    res.status(204).json({ message: "Password successfully updated" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  userLogin,
  userRegister,
  resetPassword,
};
