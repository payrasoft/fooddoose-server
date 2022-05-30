const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const orderSchema = new mongoose.Schema(
  {
    orderUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      default: "Pending",
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "orderId",
  startAt: 1,
  incrementBy: 1,
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
