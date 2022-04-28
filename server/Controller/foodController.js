const Food = require("../Models/FoodModel");
const path = require("path");
const { unlink } = require("fs");

// add new food post controller
const addNewFoodPostController = async (req, res, next) => {
  const {
    itemName,
    categoryName,
    quantity,
    price,
    deliveryTime,
    discountType,
    discountPrice,
    shortDescription,
    longDescription,
  } = req.body;
  const file = req.file.filename || "";

  try {
    const newFoodItem = new Food({
      ...req.body,
      quantity: parseInt(quantity),
      price: parseInt(price),
      discountPrice: parseInt(discountPrice),
      image: file,
    });

    // save data to database
    await newFoodItem.save();

    res.status(200).json({
      success: true,
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
    const foods = await Food.find({});

    res.status(200).json({
      success: true,
      foods,
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
    discountType,
    discountPrice,
    shortDescription,
    longDescription,
  } = req.body;
  const { foodId } = req.params;
  const file = req.file.filename || "";

  try {
    if (req.file && req.file.filename) {
      const food = await Food.findOneAndUpdate(
        { _id: foodId },
        {
          $set: {
            ...req.body,
            quantity: parseInt(quantity),
            price: parseInt(price),
            discountPrice: parseInt(discountPrice),
            image: req.file.filename,
          },
        },
        { new: true }
      );

      // delete prev img
      unlink(path.join("public/" + `uploads/${food.image}`), (err) => {
        if (err) console.log(err);
      });

      // response
      res.status(200).json({
        success: true,
        message: "Food updated successfully.",
      });
    } else {
      await Food.findOneAndUpdate(
        { _id: foodId },
        {
          $set: {
            ...req.body,
            quantity: parseInt(quantity),
            price: parseInt(price),
            discountPrice: parseInt(discountPrice),
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Food updated successfully.",
      });
    }
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
