const Users = require("../../Models/userModel");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const id = req.userId;

    const adminUser = await Users.findOne({ _id: id });

    if (adminUser.role == 3) {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: `Invalid Authentication`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = isAdmin;
