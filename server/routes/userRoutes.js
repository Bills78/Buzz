const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../middleware/auth');

router.post('/new-user', userController.newuser_post);

router.post('/log-in', userController.login_post);

router.get('/check-likes/:postId', auth, userController.likedPost_get);

router.patch('/add-liked', auth, userController.addLiked_patch);

router.patch('/remove-liked', auth, userController.removeLiked_patch);

module.exports = router;
