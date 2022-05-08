const Users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { unlink } = require("fs");
const path = require("path");

let refreshTokens = [];

// user register controller
const userRegisterController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Password Encryption
    const email1 = email.toLowerCase();
    const passwordHash = await bcrypt.hash(password, 10);

    let newUser;
    if (req.file && req.file.filename) {
      newUser = new Users({
        ...req.body,
        logo: req.file.filename || "",
        password: passwordHash,
        email: email1,
        confirmPassword: passwordHash,
      });
    } else {
      newUser = new Users({
        ...req.body,
        password: passwordHash,
        email: email1,
      });
    }

    // Save mongodb
    await newUser.save();

    // Then create jsonwebtoken to authentication
    const accesstoken = createAccessToken({ id: newUser._id });
    const refreshtoken = createRefreshToken({ id: newUser._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.json({ accesstoken });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

const isAuthenticate = async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {}
};

// user login controller
const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User does not exist." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
    if (user.role === 2 && user.status !== "Approved") {
      return res.status(400).json({ msg: "You can not login right now" });
    }

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });
    refreshTokens.push(refreshtoken);

    // generate token
    const userData = {
      email: user.email,
      name: user.name,
      number: user.number,
      id: user.id,
      role: user.role,
      _id: user._id,
      avatar: user.avatar,
    };

    // set locals
    res.locals.user = user;

    res.json({
      accesstoken,
      refreshtoken,
      userData,
      msg: "Login Successfully!",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// user logout controller
const userLogoutController = async (req, res, next) => {
  const refreshToken = req.body.rf;

  try {
    // res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    return res.status(200).json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// user update controller
const userUpdateController = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, shop_name, link, number, status } = req.body;
  const user = await Users.findOne({ _id: id });
  try {
    if (req.file) {
      const updateUser = await Users.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            logo: req.file.filename,
            ...req.body,
          },
        },
        { new: true }
      );

      unlink(
        path.join(path.dirname(__dirname), `/public/uploads/${user.logo}`),
        (err) => {
          if (err) console.log(err);
        }
      );
      res.status(200).json({
        success: true,
        message: `User updated successfully.`,
      });
    } else if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = await Users.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            password: hashedPassword,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: `User updated successfully.`,
      });
    } else {
      const updateUser = await Users.findOneAndUpdate(
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
        message: `User updated successfully.`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

// refresh Token
const refreshToken = (req, res) => {
  const rf_token = req.body.token;

  if (!rf_token)
    return res.status(400).json({ msg: "Please Login or Register" });
  if (!refreshTokens.includes(rf_token)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }
  try {
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });
      const accesstoken = createAccessToken({ id: user.id });
      res.json({ success: true, accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

// all user data
const getAllUserDataController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    if (status) {
      const total = await Users.find({ status: status });

      const user = await Users.find({ status: status })
        .sort({ createdAt: -1 })
        .select("-password -__v -confirmPassword")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      res.status(200).json({ total: total.length, user });
    }
    if (!status) {
      const total = await Users.find();
      const user = await Users.find()
        .select("-password -__v -confirmPassword")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      res.status(200).json({ total: total.length, user });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// get single user data
const getSingleUserData = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await Users.findOne({ _id: userId }).select(
      "-password -__v -confirmPassword"
    );
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// user update controller

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController,
  userUpdateController,
  refreshToken,
  getAllUserDataController,
  getSingleUserData,
  isAuthenticate,
};
