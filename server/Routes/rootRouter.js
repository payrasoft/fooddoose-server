const rootRoute = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Root route found.!`
    });
}

module.exports = rootRoute;