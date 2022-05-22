const Food = require("../Models/FoodModel");
const path = require("path");
const { unlink } = require("fs");

// add new food post controller
const addNewFoodPostController = async (req, res, next) => {
  const { itemName, categoryName, quantity, price, deliveryTime, timeFormat } =
    req.body;
  const file = req.file?.filename || "";

  try {
    const newFoodItem = new Food({
      ...req.body,
      user: req.userId,
      quantity: parseInt(quantity),
      price: parseInt(price),
      discountPrice: parseInt(req.body.discountPrice) || "",
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

// logged in user all foods get controller
const allFoodsGetController = async (req, res, next) => {
  try {
    const foods = await Food.find({ user: req.userId });

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

// all food get controller
const allFoods = async (req, res, next) => {
  try {
    const allFoods = await Food.find({ user: req.params.restaurantId });

    res.status(200).json({
      success: true,
      allFoods,
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
  const { foodId } = req.params;
  const food = await Food.findOne({ _id: foodId });

  try {
    if (req.file) {
      const updateFood = await Food.findOneAndUpdate(
        { _id: foodId },
        {
          $set: {
            image: req.file.filename,
            ...req.body,
          },
        },
        { new: true }
      );

      // delete prev img
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${food.image}`),
        (err) => {
          if (err) console.log(err);
        }
      );

      // response
      res.status(200).json({
        success: true,
        message: "Food updated successfully.",
        updateFood,
      });
    } else {
      const updateFood = await Food.findOneAndUpdate(
        { _id: foodId },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Food updated successfully.",
        updateFood,
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
  allFoods,
};
