const Post = require('../models/Post');
const express = require('express');

const router = express.Router();

// GET ALL
router.get('/getAll', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

// GET BY ID
router.get('/get/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
