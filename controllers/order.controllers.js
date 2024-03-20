const Order = require("../models/order.models");

const placeUserOrder = async (req, res) => {
  const { restaurant, items, totalPrice, deliveryAddress } = req.body;
  try {
    const user = req.userID;
    const order = new Order({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status: "placed",
    });
    await order.save();
    res.status(201).json({ message: "Order has been placed successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const orderFound = await Order.findById(id);
    if (!orderFound) throw "Order not found";
    res.status(200).json({ order: orderFound });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateOrderById = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) throw "Order not found";

    res.status(204);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  placeUserOrder,
  getOrderById,
  updateOrderById,
};
