const mongoose = require("mongoose");

const all_list_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is Required"
    },
    category: {
      type: String,
      required: "Name is Required"
    },
    state: {
      type: String,
      required: "State is Required"
    },
    district: {
      type: String,
      required: "District is Required"
    },
    city: {
      type: String,
      required: "City is Required"
    },
    streetAddress: {
      type: String,
      required: "Street Adress is Required"
    },

    latitude: {
      type: Number,
      required: "Latitude is Required"
    },
    longitude: {
      type: Number,
      required: "Longitude is Required"
    },
    rating: {
      type: Number,
      required: "Rating is Required"
    },
    views: {
      type: Number,
      required: "Views is Required"
    },
    altitude: {
      type: Number,
      required: "Altitude is Required"
    },
    categoriesSpecial:{
      type: String,
      required:"Categories Special is Required"
    },    
    
    descriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Description",
        required: "Description is Required"
      }
    ]
  },
  {
    timestamps: true
  }
);

const description_schema = new mongoose.Schema({
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
    ref: "AllList",
    required: "Place is Required Field"
  }
});

module.exports = mongoose.model("Description", description_schema);
module.exports = mongoose.model("AllList", all_list_schema);

