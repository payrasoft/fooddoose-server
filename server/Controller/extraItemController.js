const ExtraItem = require("../Models/ExtraItemModel");

const extraItemFoodAddPostController = async (req, res, next) => {
  const { itemName, price } = req.body;
  const file = req.file.filename || "";

  try {
    const newExtraItem = new ExtraItem({
      itemName,
      avatar: file,
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

module.exports = {
  extraItemFoodAddPostController,
};
