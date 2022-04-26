const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
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
        required: true,
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
    },
    role: {
        type: Number,
        default: 1,
    },
});
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
    model: "post",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model("Users", userSchema);