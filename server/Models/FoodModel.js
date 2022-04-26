const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
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
    colors: {
      type: String,
    },
    discountType: {
      type: String,
    },
    discountPrice: {
      type: Number,
    },
    extraItemName: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
