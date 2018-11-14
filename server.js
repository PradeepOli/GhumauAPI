const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const jwt    = require('jsonwebtoken'),
config = require('./configurations/config');

//database connection
require("./mongo");

//Models or Schema
require("./model/Temple");
require("./model/Trekking");
require("./model/Cave");

//Middleware
app.use(bodyParser.json()).use(morgan());


//Routes
app.use('/api/temples',require("./routes/temple"));
app.use('/api/trekking',require("./routes/trekking"));
app.use('/api/caves',require("./routes/cave"));


//set secret
app.set('Secret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());



app.post('/authenticate',(req,res)=>{

  if(req.body.username==="aymen"){

      if(req.body.password===123){
           //if eveything is okey let's create our token 

      const payload = {

          check:  true

        };

        var token = jwt.sign(payload, app.get('Secret'), {
          //  expiresIn: 1440 // expires in 24 hours

        });
       // console.log(token);


        res.json({
          message: 'authentication done ',
          token: token
        });

      }else{
          res.json({message:"please check your password !"})
      }

  }else{

      res.json({message:"user not found !"})

  }

})




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

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
