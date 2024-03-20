const express = require("express");
const {
  placeUserOrder,
  getOrderById,
  updateOrderById,
} = require("../controllers/order.controllers");
const { auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/orders").post(placeUserOrder);
router.route("/orders/:id").get(getOrderById).patch(updateOrderById);

module.exports = router;
