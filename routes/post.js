const express = require("express");
const router = express.Router();
const Post = require("../Models/bpost");
const checkauth = require("../check-auth"); //these are all imports

//Getting all posts
router.get("", checkauth, (req, res) => {
  Post.find().then((posts) => {
    res.json({
      message: "Post found",
      posts: posts,
    });
  });
});

//Posting a Post
router.post("", checkauth, (req, res) => {
  const post = new Post({
    department: req.body.department,
    location: req.body.location,
    complaint: req.body.complaint,
  });

  post.save().then(() => {
    res.status(201).json({
      message: "Post created",
      post: post,
    });
  });
});

//Deleting a Post
router.delete("/:id", checkauth, (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Post Deleted" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error" });
    });
});

module.exports = router;
