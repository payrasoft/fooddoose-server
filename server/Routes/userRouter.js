const userRouter = require("express").Router({ caseSensitive: true });
const {
    userLoginController,
    userRegisterController,
    userUpdateController,
} = require("../Controller/userController");
const { upload } = require("../Middleware/common/singleFileUpload");
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
    upload.single("avatar"),
    addUserValidators,
    addUserValidationHandler,
    userRegisterController
);
userRouter.post("/login", userLoginController);
userRouter.put("/update/:id", userUpdateController);
/* 
userRouter.get('/logout', userController.logout)
userRouter.get('/refresh_token', userController.refreshToken);
userRouter.get('/information/:id', userController.getUser)
userRouter.get('/all-information', userController.allUser)
userRouter.put('/edit/:id', auth, upload.single('avatar'), updateUserValidators, updateUserValidationHandler, userCtrl.editUser) */

// userRouter.patch('/addcart', auth, userCtrl.addCart)
// userRouter.get('/history', auth, userCtrl.history)

module.exports = userRouter;