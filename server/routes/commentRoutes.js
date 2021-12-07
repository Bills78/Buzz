const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentControllers');

router.get('/all-comments/:postId', auth, commentController.allCommentsGet)

router.post('/create-comment', auth, commentController.newCommentPost);

router.get('/check-likes/comment-likes/:postId', auth, commentController.likedPostGet);

router.patch('/comment-likes/add-liked', auth, commentController.addLikedPatch);

router.patch('/comment-likes/add-like', auth, commentController.addLikePatch);

router.patch('/comment-likes/remove-liked', auth, commentController.removeLikedPatch);

module.exports = router;
