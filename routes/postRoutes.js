const express = require('express');
const Post = require('../models/Post').postModel;
const postValidation = require('../validation/postValidation');

const router = express.Router();

// GET ALL / GET BY QUERY PARAMS
router.get('/getAll', async (req, res) => {
  try {
    const limit = await parseInt(req.query.limit);
    const page = await parseInt(req.query.page);

    const posts = await Post.find()
      .limit(limit)
      .skip(limit * page)
      .sort({ title: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BY ID
router.get('/get/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

// ADD
router.post('/addPost', async (req, res) => {
  const validation = await postValidation.validate(req.body);
  if (validation.error) {
    return res
      .status(409)
      .json({ message: validation.error.details[0].message });
  }
  const post = await new Post({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author,
    tags: req.body.tags,
  });
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE BY ID
router.delete('/delete/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      await post.remove();
      return res.json({ message: 'Post deleted' });
    } else {
      return res.status(404).json({ message: 'Post does not exist' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT
router.patch('/edit/:postId', async (req, res) => {
  try {
    const validation = await postValidation.validate(req.body);
    if (validation.error) {
      return res
        .status(409)
        .json({ message: validation.error.details[0].message });
    }
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
    res.status(500).json(err);
  }
});

module.exports = router;
