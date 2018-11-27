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
      required:"location array is required"
    }],

    geo_location: [{
      type: Number,
      required: "Latitude is Required"
    }],
  
    rating: {
      type: Number,
      required: "Rating is Required"
    },
    views: {
      type: Number,
      required: "Views is Required"
    },
    categoriesSpecial:{
      type: String,
      required:"Categories Special is Required"
    },
    way_to_destination:{
      type: String,
      required:"Way to destination is Required"
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

