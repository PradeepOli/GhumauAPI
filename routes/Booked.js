const express = require("express");
const app = express();
const jwt    = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Booked = mongoose.model("Booked");

app.set('Secret', config.secret);

router.use((req, res, next) =>{


    // check header for the token
    var token = req.headers['access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks if the token is expired
      jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
        if (err) {
          console.log("Invalid Token");
          //return res.json({ message: 'invalid token' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
     }
     else {
  
      // if there is no token  
  
      console.log("Token is required")
    }
  });
  
  router.get("/", async (req, res) => {
    const booked = await Booked.find({});
    res.send(booked);
  });

  router.get("/hotelID/:hotelID", async(req,res)=>{
    const booked = await Booked.find({category:req.params.categoryname});
    res.send(booked);
  });

  router.post("/", async (req, res) => {
    const booked = new Booked();
    booked.hotelID = req.body.hotelID;
    booked.category = req.body.category;
    booked.user_name = req.body.user_name;
    booked.user_ID = req.body.user_ID;
    booked.user_email = req.body.user_email;
   
    await booked.save();
    res.send(booked);
  });

  router.delete("/deletebooked/:bookedID", async (req, res) => {
    const booked = await Booked.findByIdAndRemove({
      _id: req.params.bookedID
    });
    res.send(booked);
  });
  router.put("/updatebooked/:bookedID", async (req, res) => {
    const booked = await Booked.findByIdAndUpdate(
      {
        _id: req.params.bookedID
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
  
    res.send(booked);
  });
  
  module.exports = router;
