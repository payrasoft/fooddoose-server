const foodRouter = require("express").Router({ caseSensitive: true });
const { addNewFoodPostController } = require("../Controller/foodController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
    foodValidator,
    foodValidationErrorHandler,
} = require("../Middleware/validator/foodValidator");

foodRouter.post(
    "/add-new-food",
    upload.single("avatar"),
    foodValidator,
    foodValidationErrorHandler,
    addNewFoodPostController
);

module.exports = foodRouter;