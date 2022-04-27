const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const applicationMiddleware = [
  morgan("dev"),
  express.json(),
  cookieParser(),
  cors({
    origin: true,
    credentials: true,
  }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
];

module.exports = applicationMiddleware;
