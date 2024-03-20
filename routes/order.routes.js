const express = require("express");
const {
  placeUserOrder,
  getOrderById,
  updateOrderById,
} = require("../controllers/order.controllers");
const { auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/orders").post(auth, placeUserOrder);
router.route("/orders/:id").get(auth, getOrderById).patch(auth, updateOrderById);

module.exports = router;
