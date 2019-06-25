const express = require("express");
const app = express();
const jwt    = require('jsonwebtoken');
const config = require('../configurations/config')
const router = require("express").Router();
const mongoose = require("mongoose");

const Question = mongoose.model("Discussion");
const Comment = mongoose.model("CommentDiscussion");

app.set('Secret', config.secret);

router.use((req, res, next) =>{


  // check header for the token
  var token = req.headers['access-token'];

  // decode token
  if (token) {

    // verifies secret and checks if the token is expired
    jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
      if (err) {
        console.log("Invalid Token");
        //return res.json({ message: 'invalid token' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

   }
   else {

    // if there is no token  

    console.log("Token is required")
  }
});


router.get("/", async (req, res) => {
  const questions = await Question.find({});
  res.send(questions);
});

router.get("/sort/:id", async (req, res) => {
  const questions = await Question.find({}).sort(req.params.id);
  res.send(questions);
});

router.get("/:questionId", async (req, res) => {
  const question = await Question.findOne({ _id: req.params.questionId }).populate(
    "comments"
  );
  res.send(question);
});

router.put("/updatequestion/:questionId", async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    {
      _id: req.params.questionId
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.send(question);
});

router.delete("/deletequestion/:questionId", async (req, res) => {
  const question = await Question.findByIdAndRemove({
    _id: req.params.questionId
  });
  res.send(question);
});

//questions, upvote, downvote, views, published_date, best_answer, comments
router.post("/", async (req, res) => {
  const question = new Question();
  question.question = req.body.question;
  question.upvote = req.body.upvote;
  question.downvote = req.body.downvote;
  question.views = req.body.views;
  question.published_date = req.body.published_date;
  question.best_answer = req.body.best_answer;
  question.email = req.body.email;
  question.photo_url = req.body.photo_url;
  question.name = req.body.name;


  await question.save();
  res.send(question);
});

// /comments

// Create a Comment
router.post("/:questionId", async (req, res) => {
  //Find a question
  const question = await Question.findOne({ _id: req.params.questionId });
//comment, upvote, downvote, email, photo_url, full_name, 
  //Create a Comment
  const comment = new Comment();
  comment.comment = req.body.comment;
  comment.upvote = req.body.upvote;
  comment.downvote = req.body.downvote;
  comment.email = req.body.email;
  comment.photo_url = req.body.photo_url;
  comment.full_name = req.body.full_name;
  comment.discussion = question._id;
  await comment.save();

  // Associate Question with comment
 // question.comments.push(comment._id);
  await question.save();

  res.send(comment);
});


//Edit a Comment
router.put("/updatecomment/:commentId", async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    {
      _id: req.params.commentId
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.send(comment);

});

router.delete("/deletecomment/:commentId", async (req, res) => {
  const comment = await Comment.findByIdAndRemove({_id: req.params.commentId});
  res.send(comment);
});

module.exports = router;
