const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const simpleUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
simpleUserSchema.plugin(autoIncrement.plugin, {
  model: "simpleUser",
  field: "userId",
  startAt: 1,
  incrementBy: 1,
});
const SimpleUser = mongoose.model("SimpleUser", simpleUserSchema);

module.exports = SimpleUser;
