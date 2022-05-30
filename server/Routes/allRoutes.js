const bannerRouter = require("./bannerRouter");
const categoryRouter = require("./categoryRouter");
const extraItemRouter = require("./extraItemRouter");
const foodRouter = require("./foodRouter");
const orderRouter = require("./orderRouter");
const OTPRouter = require("./OTPRouter");
const refreshRouter = require("./refreshRouter");
const rootRouter = require("./rootRouter");
const simpleUserRouter = require("./simpleUserRouter");
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
    path: "/banner",
    handler: bannerRouter,
  },
  {
    path: "/otp",
    handler: OTPRouter,
  },
  {
    path: "/simple-user",
    handler: simpleUserRouter,
  },
  {
    path: "/order",
    handler: orderRouter,
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
