const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const applicationMiddleware = [
    express.json(),
    cookieParser(),
    cors({
        origin: true,
        credentials: true
    }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),

];

module.exports = applicationMiddleware;