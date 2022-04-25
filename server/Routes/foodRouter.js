const foodRouter = require("express").Router({ caseSensitive: true });
const { addNewFoodPostController } = require("../Controller/foodController");
const {
    foodValidator,
    foodValidationErrorHandler,
} = require("../Middleware/validator/foodValidator");

foodRouter.post(
    "/add-new-food",
    foodValidator,
    foodValidationErrorHandler,
    addNewFoodPostController
);

module.exports = foodRouter;