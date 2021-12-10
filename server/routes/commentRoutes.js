const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentControllers');

router.get('/all-comments', auth, commentController.allCommentsGet);

router.post('/create-comment', auth, commentController.newCommentPost);
// prettier-ignore
router.get('/check-comment-likes/:postId', auth, commentController.likedPostGet);

router.patch('/add-comment-liked', auth, commentController.addLikedPatch);

router.patch('/add-comment-like', auth, commentController.addLikePatch);

router.patch('/remove-comment-liked', auth, commentController.removeLikedPatch);

module.exports = router;
