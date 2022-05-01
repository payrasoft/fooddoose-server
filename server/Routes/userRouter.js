const userRouter = require("express").Router({ caseSensitive: true });
const {
  userRegisterController,
  userLoginController,
  userLogoutController,
  userUpdateController,
  refreshToken,
  getAllUserDataController,
  getSingleUserData,
  createAccessToken,
  createRefreshToken,
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
  upload.single("logo"),
  addUserValidators,
  addUserValidationHandler,
  userRegisterController
);
userRouter.post("/login", userLoginController);
userRouter.post("/logout", userLogoutController);
userRouter.get("/all-user", getAllUserDataController); // TODO -->> remove route
// userRouter.put(
//   "/update/:id",
//   userEditValidator,
//   userEditValidatorErrorHandler,
//   userUpdateController
// );
/* 
// 
userRouter.get('/refresh_token', userController.refreshToken);
userRouter.get('/information/:id', userController.getUser)
userRouter.get('/all-information', userController.allUser)
userRouter.put('/edit/:id', auth, upload.single('avatar'), updateUserValidators, updateUserValidationHandler, userCtrl.editUser) */

// userRouter.patch('/addcart', auth, userCtrl.addCart)
// userRouter.get('/history', auth, userCtrl.history)

module.exports = userRouter;
