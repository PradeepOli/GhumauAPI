const mongoose = require("mongoose");

const cave_place_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is Required"
    },
    location: {
      type: String,
      required: "Location is Required"
    },
    imageURL: {
      type: String,
      required: "ImageURL is Required"
    },
    latitude: {
      type: String,
      required: "Latitude is Required"
    },
    longitude: {
      type: String,
      required: "Longitude is Required"
    },
    overallDetails: {
      type: String,
      required: "OverallDetails is Required"
    },
    
    
    
    descriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CaveDescription",
        required: "Description is Required"
      }
    ]
  },
  {
    timestamps: true
  }
);

const cave_description_schema = new mongoose.Schema({
  qns: {
    type: String,
    required: "Question is Required"
  },
  ans: {
    type: String,
    required: "Answer is Required"
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CavePlace",
    required: "Place is Required Field"
  }
});

module.exports = mongoose.model("CaveDescription", cave_description_schema);
module.exports = mongoose.model("CavePlace", cave_place_schema);

