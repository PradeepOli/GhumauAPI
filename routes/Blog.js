const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Blog = mongoose.model("Blog");
const Comment = mongoose.model("Comment");
const BlogContent = mongoose.model("BlogContent");


app.set('Secret', config.secret);

router.use((req, res, next) => {


  // check header for the token
  var token = req.headers['access-token'];

  // decode token
  if (token) {

    // verifies secret and checks if the token is expired
    jwt.verify(token, app.get('Secret'), (err, decoded) => {
      if (err) {
        console.log("Invalid Token");
        //return res.json({ message: 'invalid token' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token  

    console.log("Token is required")
  }
});


router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.send(blogs);
});

router.get("/sort/:id", async (req, res) => {
  const blogs = await Blog.find({}).sort(req.params.id);
  res.send(blogs);
});

router.get("/comments/:blogId", async (req, res) => {
  const blogs = await Blog.findOne({
    _id: req.params.blogId
  }).populate(
    "comments"
  );
  res.send(blogs);
});

router.get("/:blogId", async (req, res) => {
  const blogs = await Blog.findOne({
    _id: req.params.blogId
  }).populate(
    "blogContents",
  );
  res.send(blogs);
});


router.put("/updateblog/:blogId", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate({
      _id: req.params.blogId
    },
    req.body, {
      new: true,
      runValidators: true
    }
  );

  res.send(blog);
});

router.delete("/deleteblog/:blogId", async (req, res) => {
  const blog = await Blog.findByIdAndRemove({
    _id: req.params.blogId
  });
  res.send(blog);
});

//title, published_date, writer_name, likes, views, related_places_id, comments
router.post("/", async (req, res) => {
  const blog = new Blog();

  blog.title = req.body.title;
  blog.published_date = req.body.published_date;
  blog.writer_name = req.body.writer_name;
  blog.likes = req.body.likes;
  blog.views = req.body.views;
  blog.related_places_id = req.body.related_places_id;
  blog.comments = req.body.comments;
  blog.short_description = req.body.short_description;
  blog.blog_content_html = req.body.blog_content_html;
  
  await blog.save();
  res.send(blog);
});

// /comments

// Create a Comment
router.post("/comment/:blogId", async (req, res) => {
  //Find a blog
  const blog = await Blog.findOne({
    _id: req.params.blogId
  });

  //Create a Comments
  //comment, name, photoURL, comment_date, user_ID, blog, 
  const comment = new Comment();
  comment.comment = req.body.comment;
  comment.name = req.body.name;
  comment.photoURL = req.body.photoURL;
  comment.comment_date = req.body.comment_date;
  comment.user_ID = req.body.user_ID;
  comment.blog = blog._id;
  await comment.save();

  // Associate Blog with comment
  blog.comments.push(comment._id);
  await blog.save();

  res.send(comment);
});


//Edit a Comment
router.put("/updatecomment/:commentId", async (req, res) => {
  const comment = await Comment.findOneAndUpdate({
      _id: req.params.commentId
    },
    req.body, {
      new: true,
      runValidators: true
    }
  );

  res.send(comment);

});

router.delete("/deletecomment/:commentId", async (req, res) => {
  const comment = await Comment.findByIdAndRemove({
    _id: req.params.commentId
  });
  res.send(comment);
});


router.post("/:blogId", async (req, res) => {
  //Find a blog
  const blog = await Blog.findOne({
    _id: req.params.blogId
  });

  //Create a Comments
  //comment, name, photoURL, comment_date, user_ID, blog, 
  const blogContent = new BlogContent();
  blogContent.blogContent = req.body.blogContent;
  blogContent.blog = blog._id;
  blogContent.authorImageUrl = req.body.authorImageUrl;
  blogContent.aboutAuthor = req.body.aboutAuthor;
  await blogContent.save();

  // Associate Blog with comment
  blog.blogContents.push(blogContent._id);
  await blog.save();

  res.send(blogContent);
});

router.put("/updatecontent/:contentId", async (req, res) => {
  const content = await BlogContent.findOneAndUpdate({
      _id: req.params.contentId
    },
    req.body, {
      new: true,
      runValidators: true
    }
  );

  res.send(content);

});

router.delete("/deletecontent/:contentId", async (req, res) => {
  const content = await BlogContent.findByIdAndRemove({
    _id: req.params.contentId
  });
  res.send(content);
});


module.exports = router;