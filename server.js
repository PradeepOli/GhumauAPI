const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//database connection
require("./mongo");

//Models
require("./model/Temple");
require("./model/Trekking");
require("./model/Cave");


//Middleware
app.use(bodyParser.json()).use(morgan());

//Routes
app.use('/api/temples',require("./routes/temple"));
app.use('/api/trekking',require("./routes/trekking"));
app.use('/api/caves',require("./routes/cave"));


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

app.listen(3001, function() {
  console.log(`Server is running on port ${port}`);
});