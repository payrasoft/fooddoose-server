const rootRoute = require("./rootRouter");
const userRouter = require("./userRouter");

const routes = [
    {
        path: '/user',
        handler: userRouter
    },
    {
        path: '/',
        handler: rootRoute
    },
]

const allRoutes = app => {
    routes.forEach(route => {
        app.use(route.path, route.handler);
    })
}

module.exports = allRoutes;