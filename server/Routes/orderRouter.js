const orderRouter = require("express").Router({ caseSensitive: true });
const {
  orderFoodsController,
  orderStatusRejectedController,
  orderStatusApprovedController,
  singleOrderCustomerDataGetController,
  adminGetAllOrderDataController,
  singleOrderDeleteController,
} = require("../Controller/orderController");
const isAdmin = require("../Middleware/common/isAdmin");
const isAuthenticate = require("../Middleware/common/isAuthenticate");

orderRouter.post("/order-foods", isAuthenticate, orderFoodsController);
orderRouter.put("/rejected-order/:id", isAdmin, orderStatusRejectedController);
orderRouter.put("/approved-order/:id", isAdmin, orderStatusApprovedController);
orderRouter.get(
  "/user-order/",
  isAuthenticate,
  singleOrderCustomerDataGetController
);
orderRouter.get("/all-order/", isAdmin, adminGetAllOrderDataController);
orderRouter.delete("/delete-order/:id", isAdmin, singleOrderDeleteController);

module.exports = orderRouter;
