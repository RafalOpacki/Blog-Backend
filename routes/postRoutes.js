const express = require('express');
const Post = require('../models/Post').postModel;
const postValidation = require('../validation/postValidation');

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
  const validation = await postValidation.validate(req.body);
  const isTitleAlreadyTaken = await Post.find({ title: req.body.title });
  if (isTitleAlreadyTaken) {
    return res.json({ message: 'Title already taken' });
  }
  if (validation.error) {
    return res.json({ message: validation.error.details[0].message });
  }
  try {
    const post = await new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author,
      tags: req.body.tags,
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

// EDIT
router.patch('/edit/:postId', async (req, res) => {
  const validation = await postValidation.validate(req.body);
  if (validation.error) {
    return res.json({ message: validation.error.details[0].message });
  }
  try {
    await Post.updateOne(
      { _id: req.params.postId },
      {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.body.author,
        tags: req.body.tags,
      },
    );
    res.json({ message: 'updated' });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
