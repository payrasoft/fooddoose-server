const Food = require("../Models/FoodModel");

// add new food post controller
const addNewFoodPostController = async(req, res, next) => {
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
            quantity,
            price,
            deliveryTime,
            colors,
            discountType,
            discountPrice,
            extraItemName,
            avatar: file,
            shortDescription,
            longDescription,
        });

        await newFoodItem.save();
        res.status(200).json({
            success: true,
            message: `Food added successfully.`,
        });
        next();
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