const express = require("express");
const app = express();
const jwt    = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Place = mongoose.model("AllList");
const Description = mongoose.model("Description");

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
  const places = await Place.find({});
  res.send(places);
});

router.get("/sort/:id", async (req, res) => {
  const places = await Place.find({}).sort(req.params.id);
  res.send(places);
});

router.get("/:placeId", async (req, res) => {
  const place = await Place.findOne({ _id: req.params.placeId }).populate(
    "descriptions"
  );
  res.send(place);
});
router.get("/category/:categoryname", async(req,res)=>{
  const places = await Place.find({category:req.params.categoryname});
  res.send(places);
})

router.put("/updateplace/:placeId", async (req, res) => {
  const place = await Place.findByIdAndUpdate(
    {
      _id: req.params.placeId
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.send(place);
});

router.delete("/deleteplace/:placeId", async (req, res) => {
  const place = await Place.findByIdAndRemove({
    _id: req.params.placeId
  });
  res.send(place);
});

router.post("/", async (req, res) => {
  const place = new Place();
  place.category = req.body.category;
  place.name = req.body.name;
  place.state = req.body.state;
  place.district = req.body.district;
  place.city = req.body.city;
  place.streetAddress = req.body.streetAddress;
  place.latitude = req.body.latitude;
  place.longitude = req.body.longitude;
  place.altitude = req.body.altitude;
  place.categoriesSpecial = req.body.categoriesSpecial;
  place.rating = req.body.rating;
  place.views = req.body.views;await place.save();
  res.send(place);
});

// /descriptions

// Create a Description
router.post("/:placeId", async (req, res) => {
  //Find a place
  const place = await Place.findOne({ _id: req.params.placeId });

  //Create a Description
  const description = new Description();
  description.qns = req.body.qns;
  description.ans = req.body.ans;
  description.place = place._id;
  await description.save();

  // Associate Place with description
  place.descriptions.push(description._id);
  await place.save();

  res.send(description);
});


//Edit a Description
router.put("/updatedescription/:descriptionId", async (req, res) => {
  const description = await Description.findOneAndUpdate(
    {
      _id: req.params.descriptionId
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.send(description);

});

router.delete("/deletedescription/:descriptionId", async (req, res) => {
  const description = await Description.findByIdAndRemove({_id: req.params.descriptionId});
  res.send(description);
});

module.exports = router;
