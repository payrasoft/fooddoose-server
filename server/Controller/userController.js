const Users = require("../models/userModel");
const balance = require("../models/balanceModel");
const recharge = require("../models/rechargeModal");
const mobileBanking = require("../models/MobileBankingModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/* const { unlink } = require("fs");
const path = require("path"); */

let refreshTokens = [];

// user register controller
const userRegisterController = async(req, res, next) => {
    try {
        const { name, email, password, shop_name } = req.body;

        // Password Encryption
        const email1 = email.toLowerCase();
        const passwordHash = await bcrypt.hash(password, 10);

        let newUser;
        if (req.file && req.file.filename) {
            newUser = new Users({
                ...req.body,
                avatar: req.file.filename,
                password: passwordHash,
                email: email1,
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

// user login controller
const userLoginController = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) return res.status(400).json({ msg: "User does not exist." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
        if (user.role === 0 && user.status !== "Approved") {
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

        res.json({
            accesstoken,
            refreshtoken,
            userData,
            msg: "Login Successfull!",
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

// user logout controller
const userLogoutController = async(req, res, next) => {
    const refreshToken = req.header("Authorization");

    try {
        // res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        return res.json({ msg: "Logged out" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

// user update controller
const userUpdateController = async(req, res, next) => {
    const { id } = req.params;
    const { name, email, password, shop_name } = req.body;

    try {
        const user = await Users.findOne({ _id: id });

        if (!user) {
            let error = new Error(`User not found.!`);
            error.status = 404;

            throw error;
        }

        const avatar = req.file.filename;
        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.findOneAndUpdate({ _id: user._id }, { $set: { name, email, hashedPassword, shop_name, avatar } }, { new: true });
        res.status(200).json({
            success: true,
            message: `User updated successfully.`
        });

    } catch (error) {
        return res.status(400).json({
            msg: err.message
        })
    }
}

// refresh Token
const refreshToken = (req, res) => {
    const rf_token = req.header("Authorization");
    if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
    if (!refreshTokens.includes(rf_token)) {
        res.status(403).json({
            errors: [{
                msg: "Invalid refresh token",
            }, ],
        });
    }
    try {
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please Login or Register" });
            const accesstoken = createAccessToken({ id: user.id });
            res.json({ accesstoken });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

// all user data
const getAllUserDataController = (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        if (status) {
            const total = await Users.find({ status: status });

            const user = await Users.find({ status: status })
                .sort({ createdAt: -1 })
                .select("-password -__v")
                .limit(limit * 1)
                .skip((page - 1) * limit);
            if (!user) return res.status(400).json({ msg: "User does not exist." });
            res.status(200).json({ total: total.length, user });
        }
        if (!status) {
            const total = await Users.find();
            const user = await Users.find()
                .select("-password -__v")
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
const getSingleUserData = (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await Users.findOne({ _id: userId }).select(
            "-password -__v"
        );
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController,
    userUpdateController
    refreshToken,
    getAllUserDataController,
    getSingleUserData,
    createAccessToken,
    createRefreshToken
};