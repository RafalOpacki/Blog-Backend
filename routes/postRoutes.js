const express = require('express');
const Post = require('../models/Post');

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

// ADD
router.post('/addPost', async (req, res) => {
  try {
    const post = await new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author,
    });
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json(err);
  }
});

// DELETE BY ID
router.delete('/delete/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      await post.remove();
      res.json({ message: 'Post deleted' });
    } else {
      res.json({ message: 'Post does not exist' });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
