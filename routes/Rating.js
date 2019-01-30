const express = require("express");
const app = express();
const jwt    = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Rating = mongoose.model("Rating");

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
    const rating = await Rating.find({});
    res.send(rating);
  });

  router.get("/placeID/:placeID", async(req,res)=>{
    const rating = await Rating.find({category:req.params.placeID});
    res.send(rating);
  });
  
  router.post("/", async (req, res) => {
    const rating = new Rating();
    rating.rating = req.body.rating;
    rating.review = req.body.review;
    rating.name = req.body.name;
    rating.email = req.body.email;
    rating.photoURL = req.body.photoURL;
    rating.placeID = req.body.placeID;
    rating.userID = req.body.userID;

    await rating.save();
    res.send(rating);
  });

  router.delete("/deleterating/:ratingId", async (req, res) => {
    const rating = await Rating.findByIdAndRemove({
      _id: req.params.ratingId
    });
    res.send(rating);
  });
  router.put("/updateRating/:ratingID", async (req, res) => {
    const rating = await Rating.findByIdAndUpdate(
      {
        _id: req.params.ratingID
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
  
    res.send(rating);
  });
  
  module.exports = router;
