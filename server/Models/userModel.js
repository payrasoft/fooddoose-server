const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
      require: true,
    },
    shopName: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      require: true,
      trim: true,
    },
    logo: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    openHour: {
      type: String,
      require: true,
    },
    closeHour: {
      type: String,
      require: true,
    },
    latitude: {
      type: String,
      require: true,
    },
    longitude: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      trim: true,
    },
    id: {
      type: Number,
      auto: true,
    },
    status: {
      type: String,
      default: "Approved",
    },
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Users", userSchema);
