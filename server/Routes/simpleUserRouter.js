const simpleUserRouter = require("express").Router({ caseSensitive: true });
const {
  simpleUserRegisterController,
  simpleUserLoginController,
} = require("../Controller/simpleUserController");
const {
  simpleUserValidator,
  simpleUserValidatorErrorHandler,
} = require("../Middleware/validator/simpleUserValidator");

simpleUserRouter.post(
  "/register",
  simpleUserValidator,
  simpleUserValidatorErrorHandler,
  simpleUserRegisterController
);
simpleUserRouter.post("/login", simpleUserLoginController);

module.exports = simpleUserRouter;
