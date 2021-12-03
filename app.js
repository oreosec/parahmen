var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

/* custom constanta */
const helmet = require("helmet");
const connection = require("./connection");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const rateLimit = require("express-rate-limit");


/* custom middleware */
app.use(helmet());
app.use(mongoSanitize());
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

// const limiter = rateLimit({
//     max: 5,
//     windowMs: 3 * 60 * 1000,
//     message: "Too many request from this IP"
// });

app.use(cors(corsOptions));
// app.use(limiter);

module.exports = app;
