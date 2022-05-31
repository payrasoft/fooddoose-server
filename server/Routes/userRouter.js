const userRouter = require("express").Router({ caseSensitive: true });
const isAuthenticated = require("../Middleware/common/isAuthenticate");
const {
  userRegisterController,
  userLoginController,
  userLogoutController,
  userUpdateController,
  refreshToken,
  getAllUserDataController,
  getSingleUserData,
  isAuthenticate,
  allUsers,
  statusRejectedController,
  statusApprovedController,
} = require("../Controller/userController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  userEditValidator,
  userEditValidatorErrorHandler,
} = require("../Middleware/validator/userEditValidator");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../Middleware/validator/userValidator");
const {
  updateUserValidators,
  updateUserValidationHandler,
} = require("../Middleware/validator/userValidator");
// const auth = require("../Middleware/auth");

userRouter.post(
  "/register",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  addUserValidators,
  addUserValidationHandler,
  userRegisterController
);
userRouter.post("/login", userLoginController);
userRouter.put(
  "/update/:id",
  isAuthenticated,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  userUpdateController
);
userRouter.post("/logout", userLogoutController);
userRouter.get("/all-user", getAllUserDataController);
userRouter.post("/refreshToken", refreshToken);
userRouter.get("/single-user-info/", isAuthenticated, getSingleUserData);
userRouter.get(
  "/admin-get/single-user-info/:id",
  isAuthenticated,
  getSingleUserData
);
userRouter.put("/delete/:id", isAuthenticated, statusRejectedController);
userRouter.put("/approved/:id", isAuthenticated, statusApprovedController);
userRouter.get("/isAuthenticate", isAuthenticated, isAuthenticate);

module.exports = userRouter;
