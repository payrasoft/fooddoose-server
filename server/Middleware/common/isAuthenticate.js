const jwt = require("jsonwebtoken");
const isAuthenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { id, shopName } = decode;
    req.userId = id;
    req.shopName = shopName;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = isAuthenticate;
