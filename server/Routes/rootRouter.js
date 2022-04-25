const rootRouter = require("express").Router({ caseSensitive: true });

rootRouter.get("/", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Root route found.!`,
    });
});

module.exports = rootRouter;