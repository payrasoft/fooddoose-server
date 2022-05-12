const mongoose = require("mongoose");

const extraItemSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ExtraItem = mongoose.model("ExtraItem", extraItemSchema);

module.exports = ExtraItem;
