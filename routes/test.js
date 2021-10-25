const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();

// // GET /feed/posts
// router.get('/posts', userController.getPosts);

// // POST /feed/post
// router.post('/authenticate', userController.authenticateUser);


// router.get('/authenticate', userController.sample);

router.get('/testget', testController.testget);

module.exports = router;