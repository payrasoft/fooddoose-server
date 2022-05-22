const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
foodSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "orderId",
  startAt: 1,
  incrementBy: 1,
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
