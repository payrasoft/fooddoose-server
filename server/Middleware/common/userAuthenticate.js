const jwt = require("jsonwebtoken");

const userAuthenticate = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { id } = decoded;
    req.userId = id;

    next();
  } catch (error) {
    console.log(error);
    next(`Authentication Failure.!`);
  }
};

module.exports = userAuthenticate;
