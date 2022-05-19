const Users = require("../../Models/userModel");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({
        success: false,
        message: `Invalid Authentication`,
      });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { id } = decode;
    req.userId = id;

    const adminUser = await Users.findOne({ _id: id });
    if (adminUser.role == 3) {
      next();
    }

    return res.status(400).json({
      success: false,
      message: `Invalid Authentication`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = isAdmin;
