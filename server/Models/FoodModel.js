const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
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
 
    discountType: {
        type: String,
    },
    discountPrice: {
        type: Number,
    },
    extraItemName: {
        type: String,
    },
    ImageBitmap: {
        type: String,
      
    },
    shortDescription: {
        type: String,
    },
    longDescription: {
        type: String,
    },
}, { timestamps: true });

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;