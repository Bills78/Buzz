const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postsController = require('../controllers/postsControllers');

router.post('/create-post', auth, postsController.newPostPost);

router.get('/all-posts', auth, postsController.allPostsGet);

router.get('/profile-posts', auth, postsController.profilePostsGet);

router.delete('/delete-post/:postId', auth, postsController.deletePostDelete);

router.patch('/edit-post/:postId', auth, postsController.editPostPatch);

router.get('/check-likes/:postId', auth, postsController.likedPostGet);

router.patch('/add-liked', auth, postsController.addLikedPatch);

router.patch('/add-like', auth, postsController.addLikePatch);

router.patch('/remove-liked', auth, postsController.removeLikedPatch);

module.exports = router;
