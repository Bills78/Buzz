const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postsController = require('../controllers/postsControllers');

router.post('/create-post', auth, postsController.newPost_post);

router.get('/all-posts', auth, postsController.allPosts_get);

router.get('/profile-posts', auth, postsController.profilePosts_get);

router.delete('/delete-post/:postId', auth, postsController.deletePost_delete);

module.exports = router;
