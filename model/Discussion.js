const mongoose = require("mongoose");

//question, upvote, downvote, published_date, best_answer, 
//comments=>comment, upvote, downvote, email, photo_url, full_name, 
const discussion_schema = new mongoose.Schema({
  question: {
    type: String,
    required: "Name is Required"
  },
  upvote: {
    type: Number,
    default: 0
  },
 
  downvote: {
    type: Number,
    default: 0
  },
  published_date: {
    type: String,
    required: "Published Date is Required"
  },
  best_answer: {
    type: String,
    default: ""
  },
  views: {
    type: Number,
    default: 0
  },
  places_id: [{
    type: String,
    default: ""
  }],
 tags:[{
type:String,
default: ""
 }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentDiscussion",
    required: "Comment is Required"
  }]
}, {
  timestamps: true
});

const comment_discussion_schema = new mongoose.Schema({
    //comments=>comment, upvote, downvote, email, photo_url, full_name, 
  comment: {
    type: String,
    required: "Comment is Required"
  },
  upvote: {
    type: Number,
    default: 0
  },
  downvote: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    required: "Email is Required"
  },
  photo_url: {
    type: String,
    required: "Photo Url is Required"
  },
  full_name: {
    type: String,
    default: "Full name is required"
  },

  discussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion",
    required: "Discussion is Required Field"
  }
});
module.exports = mongoose.model("Discussion", discussion_schema);
module.exports = mongoose.model("CommentDiscussion", comment_discussion_schema);
