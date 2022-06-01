const orderRouter = require("express").Router({ caseSensitive: true });
const {
  orderFoodsController,
  orderStatusRejectedController,
  orderStatusApprovedController,
  singleOrderCustomerDataGetController,
  adminGetAllOrderDataController,
  singleOrderDeleteController,
  userOrderController,
  singleOrderGetById,
  orderStatusCompletedController,
} = require("../Controller/orderController");
const isAdmin = require("../Middleware/common/isAdmin");
const isAuthenticate = require("../Middleware/common/isAuthenticate");
const userAuthenticate = require("../Middleware/common/userAuthenticate");

orderRouter.post("/order-foods", userAuthenticate, orderFoodsController);

// admin order router
orderRouter.put(
  "/rejected-order/:id",
  isAuthenticate,
  orderStatusRejectedController
);
orderRouter.put(
  "/approved-order/:id",
  isAuthenticate,
  orderStatusApprovedController
);
orderRouter.get(
  "/user-order/",
  isAuthenticate,
  singleOrderCustomerDataGetController
);
orderRouter.get("/all-order/", isAuthenticate, adminGetAllOrderDataController);
orderRouter.get("/single-user-order/", userAuthenticate, userOrderController);
orderRouter.delete(
  "/delete-order/:id",
  isAuthenticate,
  singleOrderDeleteController
);
orderRouter.get(
  "/single-order-get-by-id/:id",
  isAuthenticate,
  singleOrderGetById
);
orderRouter.put(
  "/completed-order/:id",
  isAuthenticate,
  orderStatusCompletedController
);

module.exports = orderRouter;
