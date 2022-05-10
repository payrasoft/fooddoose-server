const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const CategoriesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
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
      default: "Active",
    },
    categoryId: {
      type: Number,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
CategoriesSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "categoryId",
  startAt: 1,
  incrementBy: 1,
});

const Category = mongoose.model("Category", CategoriesSchema);

module.exports = Category;
