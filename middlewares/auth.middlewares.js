const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
require("dotenv").config();

const auth = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (decoded) {
        const userFound = await User.findOne({ _id: decoded.userID });
        req.userID = userFound._id;
        next();
      } else {
        res.status(401).json({
          message: "Unauthorized: You are not authorized! Please login again!",
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized: Access token missing" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  auth,
};