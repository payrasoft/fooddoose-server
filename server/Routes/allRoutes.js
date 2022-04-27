const foodRouter = require("./foodRouter");
const refreshRouter = require("./refreshRouter");
const rootRouter = require("./rootRouter");
const userRouter = require("./userRouter");

const routes = [
  {
    path: "/user",
    handler: userRouter,
  },
  {
    path: "/refresh",
    handler: refreshRouter,
  },
  {
    path: "/food",
    handler: foodRouter,
  },
  {
    path: "/",
    handler: rootRouter,
  },
];

const allRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.handler);
  });
};

module.exports = allRoutes;
