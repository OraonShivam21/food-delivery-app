const express = require("express");
const {
  userRegister,
  userLogin,
  resetPassword,
} = require("../controllers/user.controllers");
const { auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/user/:id/reset").post(auth, resetPassword);

module.exports = router;
