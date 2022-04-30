// external dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// internal dependencies
const applicationMiddleware = require("./Middleware/common/applicationMiddleware");
const allRoutes = require("./Routes/allRoutes");

// app
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// use middleware
app.use(applicationMiddleware);

// use routes
allRoutes(app);

// database connection
const URI = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

//
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "/*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,accept,access_token,X-Requested-With"
  );
  next();
});

// server running port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
