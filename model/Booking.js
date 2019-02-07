const mongoose = require("mongoose");

const booking_schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: "Name is Required"   
   },

   category:{
        type: String,
        required: "Category is Required"
   },
      
      price: {
        type: Number,
       default: ""
      },
      details: {
        type: String,
        default: ""
      },

      userID:{
        type: String,
        default: ""
      },
      contact_number:{
        type: Number,
        default: ""
      },
      booking_status:{
        type: String,
        default: false
      },

       geo_location:[{
        type: Number,
        }],

        physical_location:[{
          type: String,
        }]
    },
      {
        timestamps: true
      }
    );  
    module.exports = mongoose.model("Booking", booking_schema);
