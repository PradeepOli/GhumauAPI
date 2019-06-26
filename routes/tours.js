const express = require("express");
const app = express();
const jwt    = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Tour = mongoose.model("Tours");
const Description = mongoose.model("ToursDescription");
const Rating = mongoose.model("ToursRating");

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
  const tours = await Tour.find({}).populate(
    "toursrating","star"
  );
  res.send(tours);
});

router.get("/sort/:id", async (req, res) => {
  const tours = await Tour.find({}).sort(req.params.id);
  res.send(tours);
});

router.get("/:tourId", async (req, res) => {
  const tour = await Tour.findOne({ _id: req.params.tourId }).populate(
    "toursdescriptions toursrating"
  )
  res.send(tour);
});
router.get("/category/:categoryname", async(req,res)=>{
  const tours = await Tour.find({category:req.params.categoryname});
  res.send(tours);
});
router.get("/category/:categoryname/location/:name", async(req,res)=>{
  const tours = await Tour.find({category:req.params.categoryname,physical_location:req.params.name});
  res.send(tours);
});

// router.get("/tour/:tourname", async(req,res)=>{
//   const tours = await Tour.find({physical_location:req.params.tourname});
//   res.send(tours);
//})

router.put("/updatetour/:tourId", async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(
    {
      _id: req.params.tourId
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.send(tour);
});

router.delete("/deletetour/:tourId", async (req, res) => {
  const tour = await Tour.findByIdAndRemove({
    _id: req.params.tourId
  });
  res.send(tour);
});

router.post("/", async (req, res) => {
  const tour = new Tour();
  tour.status = req.body.status;
  tour.name = req.body.name;
  tour.category = req.body.category;
  tour.days = req.body.days;
  tour.cost = req.body.cost;
  tour.location = req.body.location;
  tour.views = req.body.views;
  tour.cancellation = req.body.cancellation;
  tour.tags = req.body.tags;
  await tour.save();
  res.send(tour);
});

// /descriptions

// Create a Description
router.post("/:tourId", async (req, res) => {
  //Find a tour
  const tour = await Tour.findOne({ _id: req.params.tourId });

  //Create a Description
  const description = new Description();
  description.qns = req.body.qns;
  description.ans = req.body.ans;
  description.tour = tour._id;
  await description.save();

  // Associate Tour with description
  tour.toursdescriptions.push(description._id);
  await tour.save();

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

// /rating

// Create a Rating
router.post("/rating/:tourId", async (req, res) => {
  //Find a tour
  const tour = await Tour.findOne({ _id: req.params.tourId });

  //Create a Rating
  const rating = new Rating();
  rating.name = req.body.name;
  rating.email = req.body.email;
  rating.star = req.body.star;
  rating.review = req.body.review;
  rating.tour = tour._id;
  rating.photoUrl = req.body.photoUrl;
  rating.time = req.body.time;
  await rating.save();

  // Associate Tour with rating
 tour.toursrating.push(rating._id);
  await tour.save();

  res.send(rating);
});


//Edit a rating
router.put("/updaterating/:ratingId", async (req, res) => {
  const rating = await Rating.findOneAndUpdate(
    {
      _id: req.params.ratingId
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.send(rating);

});

router.delete("/deleterating/:ratingId", async (req, res) => {
  const rating = await Rating.findByIdAndRemove({_id: req.params.ratingId});
  res.send(rating);
});


module.exports = router;
