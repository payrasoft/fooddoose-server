const Category = require("../Models/CategorieModel");
const path = require("path");
const { unlink } = require("fs");

// post controller
const categoryPostController = async (req, res, next) => {
  const { categoryName, status } = req.body;
  const file = req.file?.filename;

  try {
    const newCategory = new Category({
      user: req.userId,
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
      newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// all category get controller
const allCategoryGetController = async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;

  try {
    const categories = await Category.find({ user: req.userId });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// delete category
const deleteCategoryController = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Category.findOneAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Category item delete successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// single category
const singleCategoryGetController = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
    });

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// update category
const updateCategoryController = async (req, res, next) => {
  const { id } = req.params;
  const { categoryName, status } = req.body;
  const file = req.file?.filename || "";

  try {
    const category = await Category.findOne({ _id: id });

    if (req.file) {
      const updateCategory = await Category.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
            image: file,
          },
        },
        { new: true }
      );

      // delete prev img
      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${category.image}`),
        (err) => {
          if (err) console.log(err);
        }
      );

      // response
      res.status(200).json({
        success: true,
        message: "Category updated successfully.",
        updateCategory,
      });
    } else {
      const updateCategory = await Category.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Category updated successfully.",
        updateCategory,
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
  categoryPostController,
  allCategoryGetController,
  deleteCategoryController,
  singleCategoryGetController,
  updateCategoryController,
};
