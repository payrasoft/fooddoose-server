const simpleUserRouter = require("express").Router({ caseSensitive: true });
const {
  simpleUserRegisterController,
  simpleUserLoginController,
  singleUserData,
  allUserData,
  updateUser,
} = require("../Controller/simpleUserController");
const { isAuthenticate } = require("../Controller/userController");
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
simpleUserRouter.get("/single-user", isAuthenticate, singleUserData);
simpleUserRouter.get("/all-user", isAuthenticate, allUserData);
simpleUserRouter.put("/update/:id", isAuthenticate, updateUser);

module.exports = simpleUserRouter;
