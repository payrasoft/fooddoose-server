const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategoriesSchema);

module.exports = Category;
