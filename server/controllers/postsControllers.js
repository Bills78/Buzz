const Post = require('../models/posts');
const User = require('../models/user');

module.exports.newPostPost = async (req, res) => {
	const { body } = req.body;
	const username = req.user.username;

	const post = new Post({
		body,
		postedBy: username,
		likes: 0,
	});

	post.save().catch(err => console.log(err));

	const posts = await Post.find({}).sort({ createdAt: -1 });
	res.json(posts);
};

module.exports.allPostsGet = async (req, res) => {
	const username = req.user.username;
	const posts = await Post.find({}).sort({ createdAt: -1 });
	res.json({
		posts,
		username,
	});
};

module.exports.profilePostsGet = async (req, res) => {
	const username = req.user.username;
	const posts = await Post.find({ postedBy: username }).sort({ createdAt: -1 });
	res.json({
		posts,
		username,
	});
};

module.exports.deletePostDelete = (req, res) => {
	const postId = req.query.post_id;
	Post.findByIdAndDelete({ _id: postId }, (err, deleted) => {
		if (err) {
			console.log(err);
		}
		res.json(deleted);
	});
};

module.exports.editPostPatch = async (req, res) => {
	const postId = req.query.post_id;
	const body = req.body.body;
	Post.findByIdAndUpdate(
		postId,
		{
			body: `${body}`,
		},
		(err, res) => {
			if (err) {
				console.log(err);
			}
			console.log(res);
		}
	);
};

module.exports.addLikePatch = async (req, res) => {
	const postId = req.query.post_id;
	const likes = req.body.likes;
	Post.findByIdAndUpdate(
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
				res.status(501).json(err.message);
			}
			res.status(201).json(result);
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
				res.status(501).json(err.message);
			}
			res.status(201).json(result);
		}
	);
};
