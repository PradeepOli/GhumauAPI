const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const jwt = require('jsonwebtoken'),
  config = require('./configurations/config');

//database connection
require("./mongo");

//Models or Schema
require("./model/AllList");
require("./model/Rating");
require("./model/Blog");
require("./model/Discussion")
require("./model/tours")


//Middleware
app.use(bodyParser.json()).use(morgan());


//Routes
app.use('/api', require("./routes/AllList"));
app.use('/rating', require("./routes/Rating"));
app.use('/blogapi', require("./routes/Blog"))
app.use('/test', require("./routes/test"))
app.use('/discussionapi', require("./routes/Discussion"))
app.use('/toursapi',require("./routes/tours"))

//set secret
app.set('Secret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json());

//Not Found Route
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

//error handler

if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack
  });
});
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});