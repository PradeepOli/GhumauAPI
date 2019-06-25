const mongoose = require("mongoose");

const blog_schema = new mongoose.Schema({
    title: {
      type: String,
      required: "Name is Required"
    },
    published_date: {
      type: String,
      required: "Published date is Required"
    },
    writer_name: {
      type: String,
      required: "Writer name is Required"
    },

    likes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    short_description:{
      type: String,
      default: ""
    },
    related_places_id: [{
      type: String,
      default: ""
    }],

    blogContents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogContent",
      required: "Blog content is required"
    }],

    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: "Comment is Required"
    }]
  },

  {
    timestamps: true
  });

const comment_schema = new mongoose.Schema({
  comment: {
    type: String,
    required: "Comment is Required"
  },
  name: {
    type: String,
    required: "Name is Required"
  },
  photoURL: {
    type: String,
    required: "Photo URL is required"
  },
  comment_date: {
    type: String,
    required: "Comment date is required"
  },
  user_ID: {
    type: String,
    required: "UserId is required"
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: "Blog is Required Field"
  }
});

const blog_content_schema = new mongoose.Schema({
  blogContent: {
    type: String,
    required: "Blog Content in HTML is Required"
  },
  authorImageUrl:{
    type: String,
    default:""
  },
  aboutAuthor:{
    type: String,
    default:""
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: "Blog is Required Field"
  }
});


module.exports = mongoose.model("Comment", comment_schema);
module.exports = mongoose.model("Blog", blog_schema);
module.exports = mongoose.model("BlogContent", blog_content_schema);