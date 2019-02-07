const express = require("express");
const app = express();
const jwt    = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Booking = mongoose.model("Booking");

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
    const booking = await Booking.find({});
    res.send(booking);
  });

  router.get("/category/:categoryname", async(req,res)=>{
    const booking = await Booking.find({category:req.params.categoryname});
    res.send(booking);
  });

  router.post("/", async (req, res) => {
    const booking = new Booking();
    booking.name = req.body.name;
    booking.price = req.body.price;
    booking.geo_location = req.body.geo_location;
    booking.physical_location = req.body.physical_location;
    booking.details = req.body.details;
    booking.category = req.body.category;
    booking.contact_number = req.body.contact_number;
   
    await booking.save();
    res.send(booking);
  });

  router.delete("/deletebooking/:bookingID", async (req, res) => {
    const booking = await Booking.findByIdAndRemove({
      _id: req.params.bookingID
    });
    res.send(booking);
  });
  router.put("/updatebooking/:bookingID", async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
      {
        _id: req.params.bookingID
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
  
    res.send(booking);
  });
  
  module.exports = router;
