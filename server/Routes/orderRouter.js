const orderRouter = require("express").Router({ caseSensitive: true });
const {
  orderFoodsController,
  orderStatusRejectedController,
  orderStatusApprovedController,
  singleOrderCustomerDataGetController,
  adminGetAllOrderDataController,
  singleOrderDeleteController,
  userOrderController,
} = require("../Controller/orderController");
const isAdmin = require("../Middleware/common/isAdmin");
const isAuthenticate = require("../Middleware/common/isAuthenticate");
const userAuthenticate = require("../Middleware/common/userAuthenticate");

orderRouter.post("/order-foods", userAuthenticate, orderFoodsController);
orderRouter.put(
  "/rejected-order/:id",
  isAuthenticate,
  isAdmin,
  orderStatusRejectedController
);
orderRouter.put(
  "/approved-order/:id",
  isAuthenticate,
  isAdmin,
  orderStatusApprovedController
);
orderRouter.get(
  "/user-order/",
  isAuthenticate,
  singleOrderCustomerDataGetController
);
orderRouter.get(
  "/all-order/",
  isAuthenticate,
  isAdmin,
  adminGetAllOrderDataController
);
orderRouter.get("/single-user-order/", userAuthenticate, userOrderController);
orderRouter.delete(
  "/delete-order/:id",
  isAuthenticate,
  isAdmin,
  singleOrderDeleteController
);

module.exports = orderRouter;
