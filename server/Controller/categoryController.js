const Category = require("../Models/CategorieModel");

const categoryPostController = async (req, res, next) => {
  const { categoryName, status } = req.body;
  const file = req.file?.filename;

  try {
    const newCategory = new Category({
      user: req.user._id,
      categoryName,
      image: file,
      status,
    });

    // save database
    await newCategory.save();

    // response
    res.status(200).json({
      success: true,
      message: `Category added successfully.!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

module.exports = {
  categoryPostController,
};
