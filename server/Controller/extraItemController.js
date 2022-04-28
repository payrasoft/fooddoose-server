const ExtraItem = require("../Models/ExtraItemModel");
const { unlink } = require("fs");
const path = require("path");

// extra item add controller
const extraItemFoodAddPostController = async (req, res, next) => {
  const { itemName, price } = req.body;
  const file = req.file.filename || "";

  try {
    const newExtraItem = new ExtraItem({
      itemName,
      image: file,
      price: parseInt(price),
    });

    // info save to database
    await newExtraItem.save();

    // response
    res.status(200).json({
      success: true,
      message: `Food added successfully.!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// extra all items
const allExtraFoodItemsGetController = async (req, res, next) => {
  try {
    const extraItems = await ExtraItem.find({});

    res.status(200).json({
      success: true,
      extraItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// single extra food item
const singleExtraFoodItem = async (req, res, next) => {
  const { foodId } = req.params;

  try {
    const food = await ExtraItem.findOne({ _id: foodId });

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete food item
const deleteSingleExtraFoodItem = async (req, res, next) => {
  const { foodId } = req.params;

  try {
    await ExtraItem.findOneAndDelete({ _id: foodId });

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

// update extra food controller
const updateExtraFoodController = async (req, res, next) => {
  const { foodId } = req.params;
  const { itemName, price } = req.body;
  const file = req.file.filename || "";

  try {
    const food = await ExtraItem.findOne({ _id: foodId });
    console.log(food);

    if (req.file && req.file.filename) {
      const updateFood = await ExtraItem.findOneAndUpdate(
        { _id: foodId },
        {
          $set: {
            itemName,
            price: parseInt(price),
            image: file,
          },
        },
        { new: true }
      );
      console.log(path.join(path.dirname(__dirname)));
      // delete prev img
      unlink(path.join("public/" + `uploads/${food.image}`), (err) => {
        if (err) console.log(err);
      });

      // response
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

module.exports = {
  extraItemFoodAddPostController,
  allExtraFoodItemsGetController,
  singleExtraFoodItem,
  deleteSingleExtraFoodItem,
  updateExtraFoodController,
};
