const mongoose = require("mongoose");

const extraItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
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
