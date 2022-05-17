const Banner = require("../Models/BannerModel");
const path = require("path");
const { unlink } = require("fs");

// add banner post controller
const addBannerPostController = async (req, res, next) => {
  const { status } = req.body;
  const file = req.file?.filename || "";

  try {
    const newBanner = new Banner({
      user: req.userId,
      image: file,
      status,
    });

    // save to database
    await newBanner.save();

    // response
    res.status(200).json({
      success: true,
      message: `New banner added successfully.!`,
      newBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get all banner is Admin
const getAllBanner = async (req, res, next) => {
  try {
    const allBanner = await Banner.find({ user: req.userId });

    if (allBanner) {
      res.status(200).json({
        success: true,
        allBanner,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// get single banner
const getSingleBanner = async (req, res, next) => {
  const { bannerId } = req.params;

  try {
    const banner = await Banner.findOne({ user: req.userId, _id: bannerId });

    if (banner) {
      res.status(200).json({
        success: true,
        banner,
      });
    }
    res.status(404).json({
      success: false,
      message: `Banner not found.!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// update banner
const updateBanner = async (req, res, next) => {
  const { bannerId } = req.params;
  const { status } = req.body;
  const file = req.file?.filename || "";

  try {
    const banner = await Banner.findOne({ user: req.userId, _id: bannerId });

    if (req.file) {
      const updatedBanner = await Banner.findOneAndUpdate(
        { _id: bannerId },
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
        path.join(path.dirname(__dirname), `/public/uploads/${banner.image}`),
        (err) => {
          if (err) console.log(err);
        }
      );

      // response
      res.status(200).json({
        success: true,
        message: "Banner updated successfully.",
        updatedBanner,
      });
    }

    res.status(500).json({
      success: false,
      message: `Banner updated failed.!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

// delete banner
const deleteBanner = async (req, res, next) => {
  const { bannerId } = req.params;

  try {
    await Banner.findOneAndDelete({ _id: bannerId });

    res.status(200).json({
      success: true,
      message: "Banner delete successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error.!`,
    });
  }
};

module.exports = {
  addBannerPostController,
  getAllBanner,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
