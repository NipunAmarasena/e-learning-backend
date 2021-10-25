const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// // GET /feed/posts
// router.get('/posts', userController.getPosts);

// // POST /feed/post
// router.post('/authenticate', userController.authenticateUser);


// router.get('/authenticate', userController.sample);

router.post('/register', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;