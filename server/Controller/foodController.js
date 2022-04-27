const Food = require("../Models/FoodModel");

// add new food post controller
const addNewFoodPostController = async (req, res, next) => {
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
    const file = req.file?.filename || "";

    try {
        const newFoodItem = new Food({
            user: req.userId,
            itemName,
            categoryName,
            quantity: parseInt(quantity),
            price: parseInt(price),
            deliveryTime,
            colors,
            discountType,
            discountPrice: parseInt(discountPrice),
            extraItemName,
            image: file,
            shortDescription,
            longDescription,
        });

        // save data to database
        await newFoodItem.save();

        res.status(200).json({
            message: "Food added successfully.!",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `There was an server side error`,
        });
    }
};

// all foods get controller
const allFoodsGetController = async (req, res, next) => {
    try {
        const foods = await Food.find();

        res.status(200).json({
            success: true,
            books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `There was an server side error`,
        });
    }
};

// single food get controller
const singleItemFoodGetController = async (req, res, next) => {
    const { foodId } = req.params;

    try {
        const food = await Food.findOne({ _id: foodId });

        res.status(200).json({
            success: true,
            food,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `There was an server side error`,
        });
    }
};

// food update controller
const foodUpdateController = async (req, res, next) => {
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
    const { foodId } = req.params;
    const file = req.file.filename || "";

    try {
        await Food.findByIdAndUpdate({ _id: foodId }, {
            $set: {
                itemName,
                categoryName,
                quantity: parseInt(quantity),
                price: parseInt(price),
                deliveryTime,
                colors,
                discountType,
                discountPrice: parseInt(discountPrice),
                extraItemName,
                shortDescription,
                longDescription,
            },
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Food updated successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `There was an server side error`,
        });
    }
};

// single food item delete controller
const singleFoodItemDeleteController = async (req, res, next) => {
    const { foodId } = req.params;

    try {
        await Food.findOneAndDelete({ _id: foodId });

        res.status(200).json({
            success: true,
            message: "Food delete successfully.",
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
    allFoodsGetController,
    singleItemFoodGetController,
    foodUpdateController,
    singleFoodItemDeleteController,
};