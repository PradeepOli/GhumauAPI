const mongoose = require("mongoose");

const tours_schema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is Required"
  },
  category: {
    type: String,
    required: "Category is Required"
  },
  location: [{

    type: String,
    default: null
  }],

  tags: [{
    type: String,
    default: null
  }],
  
  views: {
    type: Number,
    default: 0
  },
    number_of_images: {
    type: Number,
    default: 1
  },
  

  staus: {
    type: Boolean,
    default: true
  },
  days:[{
      type: Number,
      required: "Days is required"
  }],
  cost:{
      type: Number,
      required: "Cost is required"
  },
  cancellation:{
      type: Number,
      default: 0
  },

  toursdescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToursDescription",
    required: "Description is Required"
  }],

  toursrating:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ToursRating",
      required: "Rating is required"
  }]

}, {
  timestamps: true
});

const tours_description_schema = new mongoose.Schema({
  qns: {
    type: String,
    required: "qns is Required"
  },
  ans: {
    type: String,
    required: "Answer is Required"
  },
 
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tours",
    required: "tour is Required Field"
  }
});

const tours_rating_schema = new mongoose.Schema({
    name:{
        type: String,
        required: "name is required"
    },
    email:{
        type: String,
        required: "email is required"
    },
    star:{
        type: Number,
        required: "star is required"
    },
    review:{
        type: String,
        required: "Review is required"
    },
    photoUrl:{
      type: String,
      default:""
    },
    time:{
      type: String,
      required: "Time is required"
    },
    tour:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tours",
        required: "tour is required field"
    }
})

module.exports = mongoose.model("ToursDescription", tours_description_schema);
module.exports = mongoose.model("Tours", tours_schema);
module.exports = mongoose.model("ToursRating", tours_rating_schema);