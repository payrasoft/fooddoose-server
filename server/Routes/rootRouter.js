const rootRouter = require("express").Router({ caseSensitive: true });

rootRouter.get("/", (req, res) => {
    res.send('Welcome')
});

module.exports = rootRouter;