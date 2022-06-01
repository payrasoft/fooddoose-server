const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { unlink } = require("fs");
const path = require("path");
const SimpleUser = require("../Models/SimpleUserModel");

// register
const simpleUserRegisterController = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  // Password Encryption
  const email1 = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newUser = new SimpleUser({
      ...req.body,
      email: email1,
      password: passwordHash,
      confirmPassword: passwordHash,
    });

    // save db
    await newUser.save();

    // Then create jsonwebtoken to authentication
    const accessToken = createAccessToken({
      id: newUser._id,
      name: newUser.name,
      phone: newUser.phone,
    });
    const refreshToken = createRefreshToken({ id: newUser._id });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// login
const simpleUserLoginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await SimpleUser.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid Credential." });

    // matched password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credential." });

    const accessToken = createAccessToken({
      id: user._id,
      name: user.name,
      phone: user.phone,
    });

    // user data
    const userData = {
      _id: user._id,
      userName: user.name,
      email: user.email,
      phone: user.phone,
    };

    res.json({
      accessToken,
      userData,
      success: true,
      message: "Login Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// all user data
const allUserData = async (req, res, next) => {
  try {
    const allUser = await SimpleUser.find({}).select(
      "-password -__v -confirmPassword"
    );

    res.status(200).json({
      success: true,
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// single user data
const singleUserData = async (req, res, next) => {
  try {
    const user = await SimpleUser.findOne({ _id: req.userId }).select(
      "-password -__v -confirmPassword"
    );

    if (!user) return res.status(400).json({ msg: "User does not exist." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

// update
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await SimpleUser.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            password: hashedPassword,
            confirmPassword: hashedPassword,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: `User updated successfully.`,
      });
    } else {
      const updatedUser = await SimpleUser.findByIdAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: `User updated successfully.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There was an server side error`,
    });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = {
  simpleUserRegisterController,
  simpleUserLoginController,
  allUserData,
  singleUserData,
  updateUser,
};
