const foodRouter = require("express").Router({ caseSensitive: true });
const {
  addNewFoodPostController,
  allFoodsGetController,
  singleItemFoodGetController,
  foodUpdateController,
  singleFoodItemDeleteController,
} = require("../Controller/foodController");
const { upload } = require("../Middleware/common/singleFileUpload");
const {
  foodValidator,
  foodValidationErrorHandler,
} = require("../Middleware/validator/foodValidator");

foodRouter.post(
  "/add-new-food",
  upload.single("image"),
  foodValidator,
  foodValidationErrorHandler,
  addNewFoodPostController
);
foodRouter.get("/all-foods", allFoodsGetController);
foodRouter.get("/single-item/:foodId", singleItemFoodGetController);
foodRouter.put("/update/single-item/:foodId", foodUpdateController);
foodRouter.delete("/delete/:foodId", singleFoodItemDeleteController);

module.exports = foodRouter;
