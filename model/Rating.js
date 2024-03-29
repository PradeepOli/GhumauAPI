const mongoose = require("mongoose");

const rating_schema = new mongoose.Schema(
    {
      rating: {
        type: Number,
        default: 0
      },
      review: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        required: "Name is Required"
      },
      email: {
        type: String,
        required: "Email is Required"
      },
      photoURL: {
        type: String,
        required: "Photo URL is Required"
      },
      placeID: {
        type: String,
        required: "Place ID is Required"
      },
      userID: {
        type: String,
        required: "UserID is Required"
      },
      liked:[{
        type: String
        }],
        date:{
          type: String,
          default:""
        }
    },
      {
        timestamps: true
      }
    );  
    module.exports = mongoose.model("Rating", rating_schema);
