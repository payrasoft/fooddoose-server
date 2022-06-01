const Order = require("../Models/OrderModel");

// new order
const orderFoodsController = async (req, res, next) => {
  const { items } = req.body;
  console.log(req.body);

  try {
    const newOrder = new Order({
      ...req.body,
      orderUserId: req.userId,
      name: req.name,
      phone: req.phone,
      items,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Order done.!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// order status rejected controller
const orderStatusRejectedController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateStatus = await Order.findOneAndUpdate(
      { _id: id },
      { $set: { status: "Rejected" } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Status rejected successfully.!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// order status approved controller
const orderStatusApprovedController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateStatus = await Order.findOneAndUpdate(
      { _id: id },
      { $set: { status: "Approved" } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Status approved successfully.!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// order status completed controller
const orderStatusCompletedController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateStatus = await Order.findOneAndUpdate(
      { _id: id },
      { $set: { status: "Completed" } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Status Completed successfully.!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// single user all order data
const singleOrderCustomerDataGetController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ orderUserId: req.userId }).populate(
      "items"
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// admin get all data
const adminGetAllOrderDataController = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("items");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// delete order
const singleOrderDeleteController = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Order.findOneAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Order delete successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// user order controller
const userOrderController = async (req, res, next) => {
  try {
    const userOrderData = await Order.find({
      orderUserId: req.userId,
    }).populate("items");

    res.status(200).json({
      success: true,
      data: userOrderData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// single order get by id
const singleOrderGetById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: id }).populate("items");

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

module.exports = {
  orderFoodsController,
  orderStatusRejectedController,
  orderStatusApprovedController,
  singleOrderCustomerDataGetController,
  adminGetAllOrderDataController,
  singleOrderDeleteController,
  userOrderController,
  singleOrderGetById,
  orderStatusCompletedController,
};
