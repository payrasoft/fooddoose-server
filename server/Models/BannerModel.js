const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const bannerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
bannerSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "bannerId",
  startAt: 1,
  incrementBy: 1,
});
const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
