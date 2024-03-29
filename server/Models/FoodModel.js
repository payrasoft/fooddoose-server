const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const foodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    timeFormat: {
      type: String,
    },
    discountType: {
      type: String,
    },
    discountPrice: {
      type: Number,
    },
    image: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    foodId: {
      type: Number,
      auto: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
foodSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "foodId",
  startAt: 1,
  incrementBy: 1,
});
const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
