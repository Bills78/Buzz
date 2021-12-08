const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.allCommentsGet = async (req, res) => {
	const comments = await Comment.find({}).sort({ createdAt: -1 });
	res.json(comments);
	console.log(comments);
};

module.exports.newCommentPost = (req, res) => {
	const { mainPost, body } = req.body;
	const username = req.user.username;

	console.log(mainPost);
	console.log(body);
	console.log(username);

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

module.exports.addLikePatch = async (req, res) => {
	const postId = req.query.post_id;
	const likes = req.body.likes;
	Comment.findByIdAndUpdate(
		postId,
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

module.exports.likedPostGet = async (req, res) => {
	const postId = req.query.post_id;
	const username = req.user.username;
	User.find({ username }, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const isLiked = result[0].liked.includes(postId);
			res.json({ data: isLiked });
		}
	});
};

module.exports.addLikedPatch = async (req, res) => {
	const postId = req.body.postId;
	const username = req.user.username;
	User.updateOne(
		{ username },
		{ $addToSet: { liked: [`${postId}`] } },
		(err, result) => {
			if (err) {
				res.json(err.message);
			}
			console.log(result);
		}
	);
};

module.exports.removeLikedPatch = async (req, res) => {
	const postId = req.body.postId;
	const username = req.user.username;
	User.updateOne(
		{ username },
		{ $pullAll: { liked: [`${postId}`] } },
		(err, result) => {
			if (err) {
				res.json(err.message);
			}
			res.json(result);
		}
	);
};
