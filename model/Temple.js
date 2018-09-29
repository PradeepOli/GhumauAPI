const mongoose = require("mongoose");

const temple_place_schema = new mongoose.Schema(
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
        ref: "TempleDescription",
        required: "Description is Required"
      }
    ]
  },
  {
    timestamps: true
  }
);

const temple_description_schema = new mongoose.Schema({
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
    ref: "TemplePlace",
    required: "Place is Required Field"
  }
});

module.exports = mongoose.model("TempleDescription", temple_description_schema);
module.exports = mongoose.model("TemplePlace", temple_place_schema);

