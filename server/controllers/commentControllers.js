const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.allCommentsGet = async (req, res) => {
	const username = req.user.username;
	const comments = await Comment.find({}).sort({ createdAt: -1 });
	const userLikes = await User.find({ username });
	const liked = userLikes[0].liked;
	res.json({
		comments,
		liked,
	});
};

module.exports.newCommentPost = (req, res) => {
	const { mainPost, body } = req.body;
	const username = req.user.username;
	console.log(mainPost);

	const comment = new Comment({
		mainPost,
		body,
		postedBy: username,
		likes: 0,
	});

	comment
		.save()
		.then(res.json({ message: 'comment saved' }))
		.catch(err => console.log(err));
};

module.exports.likedPostGet = (req, res) => {
	const commentId = req.query.commentId;
	const username = req.user.username;
	User.find({ username }, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			result.map(user => {
				const isLiked = user.liked.includes(commentId);
				res.json({ data: isLiked });
			});
		}
	});
};

module.exports.addLikePatch = async (req, res) => {
	const commentId = req.query.commentId;
	console.log(commentId);
	const likes = req.body.likes;
	Comment.findByIdAndUpdate(
		commentId,
		{
			likes: `${likes}`,
		},
		(err, result) => {
			if (err) {
				console.log(err);
			}
			res.json(result.likes);
		}
	);
};

module.exports.addLikedPatch = async (req, res) => {
	const commentId = req.body.commentId;
	const username = req.user.username;
	User.updateOne(
		{ username },
		{ $addToSet: { liked: [`${commentId}`] } },
		(err, result) => {
			if (err) {
				res.status(501).json(err.message);
			}
			res.status(201).json(result);
		}
	);
};

module.exports.removeLikedPatch = async (req, res) => {
	const commentId = req.body.commentId;
	const username = req.user.username;
	User.updateOne(
		{ username },
		{ $pullAll: { liked: [`${commentId}`] } },
		(err, result) => {
			if (err) {
				res.status(501).json(err.message);
			}
			res.status(201).json(result);
		}
	);
};
