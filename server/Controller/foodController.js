const Food = require("../Models/FoodModel");

// add new food post controller
const addNewFoodPostController = async(req, res, next) => {
    console.log(req.body);
    console.log(req.file.filename);

    const {
        itemName,
        categoryName,
        quantity,
        price,
        deliveryTime,
        colors,
        discountType,
        discountPrice,
        extraItemName,
        shortDescription,
        longDescription,
    } = req.body;

    const file = req.file.filename || "";

    try {
        const newFoodItem = new Food({
            itemName,
            categoryName,
            quantity: parseInt(quantity),
            price: parseInt(price),
            deliveryTime,
            colors,
            discountType,
            discountPrice: parseInt(discountPrice),
            extraItemName,
            avatar: file,
            shortDescription,
            longDescription,
        });
        console.log("save before");
        await newFoodItem.save();
        console.log("save");
        res.status(200).json({
            message: "Food added successfully!",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `There was an server side error`,
        });
    }
};

module.exports = {
    addNewFoodPostController,
};