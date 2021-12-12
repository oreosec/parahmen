var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');

var app = express();

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const hpp = require("hpp");

const corsOptions = {
    origin: "http://127.0.0.1:3000",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type"]
}

app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors(corsOptions));

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

/* custom constanta */
const connection = require("./connection");

module.exports = app;
