const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// GET ALL / GET BY QUERY PARAMS
// posts/getAll?limit=10&page=1 // 1 = first page
router.get('/getAll', postController.getAllPosts);

// GET BY ID
router.get('/get/:postId', postController.getPostById);

// ADD
router.post('/addPost', postController.addPost);

// DELETE BY ID
router.delete('/delete/:postId', postController.deletePost);

// EDIT
router.patch('/edit/:postId', postController.addPost);

module.exports = router;
