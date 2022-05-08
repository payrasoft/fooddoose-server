const categoryRouter = require("./categoryRouter");
const extraItemRouter = require("./extraItemRouter");
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
    path: "/food",
    handler: foodRouter,
  },
  {
    path: "/food",
    handler: extraItemRouter,
  },
  {
    path: "/refresh",
    handler: refreshRouter,
  },
  {
    path: "/category",
    handler: categoryRouter,
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
