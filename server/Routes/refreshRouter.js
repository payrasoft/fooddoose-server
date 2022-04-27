const refreshRouter = require("express").Router({ caseSensitive: true });
const jwt = require("jsonwebtoken");

refreshRouter.post("/", (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.json({ message: "Refresh token not found, login again" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (!err) {
      const accessToken = jwt.sign(
        { username: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20s",
        }
      );
      return res.json({ success: true, accessToken });
    } else {
      return res.json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  });
});

module.exports = refreshRouter;
