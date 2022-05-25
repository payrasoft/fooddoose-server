const OTPRouter = require("express").Router({ caseSensitive: true });
const OTPLoginController = require("../Controller/OTPController");

OTPRouter.post("/login", OTPLoginController);

module.exports = OTPRouter;
