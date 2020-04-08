const Post = require('../models/Post').postModel;
const postValidation = require('../validation/postValidation');

// GET ALL

const getAllPosts = async (req, res) => {
  try {
    const limit = await parseInt(req.query.limit);
    const page = await parseInt(req.query.page);
    const posts = await Post.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ creationDate: 'desc' });
    const postsCount = await Post.count();
    const pagesCount = await Math.round(postsCount / limit + 0.5);
    res.json({
      posts,
      pageable: { pagesCount, limit, currentPage: page, postsCount },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY ID

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(post);
  } catch (err) {
    res.json(err);
  }
};

// ADD NEW POST

const addPost = async (req, res) => {
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
    res.status(201).json({ savedPost, message: 'Post saved successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE POST

const deletePost = async (req, res) => {
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
};

// EDIT POST

const editPost = async (req, res) => {
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
    const modifiedPost = await Post.findById(req.params.postId);
    res.json({
      post: modifiedPost,
      message: 'updated',
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllPosts, getPostById, addPost, deletePost, editPost };
