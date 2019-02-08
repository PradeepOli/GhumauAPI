const mongoose = require("mongoose");

const booked_schema = new mongoose.Schema(
    {
      hotelID: {
        type: String,
        required: "Name is Required"   
   },

   category:{
        type: String,
        required: "Category is Required"
   },

      user_name: {
        type: String,
        default: ""
      },

      userID:{
        type: String,
        default: ""
      },
      user_email:{
        type: String,
        default: ""
      },
        
    },
      {
        timestamps: true
      }
    );  
    module.exports = mongoose.model("Booked", booked_schema);
