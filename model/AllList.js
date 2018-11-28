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
    physical_location:[{
      
      type: String,
      default: null
    }],

    geo_location: [{
      type: Number,
      required: "Latitude is Required"
    }],
  
    rating: {
      type: Number,
default: null
    },
    views: {
      type: Number,
      default: null
    },
    categoriesSpecial:{
      type: String,
      default: null
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
    required: "qns is Required"
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

