const Post = require('../models/posts');

module.exports.newPost_post = async (req, res) => {
  const { body } = req.body;
  const username = req.user.username;
  
  const post = new Post({
    body,
    postedBy: username,
    likes: 0,
  });

  post.save()
  .catch(err => console.log(err));
  
  const posts = await Post.find({}).sort({createdAt: -1});
  res.json(posts)
}

module.exports.allPosts_get = async (req, res) => {
  const username = req.user.username
  const posts = await Post.find({}).sort({createdAt: -1});
  res.json({
    posts,
    username
  });
}

module.exports.profilePosts_get = async (req, res) => {
  const username = req.user.username;
  const posts = await Post.find({postedBy: username}).sort({createdAt: -1});
  res.json({ 
    posts,
    username
  });
}

module.exports.deletePost_delete = (req, res) => {
  const postId = req.query.post_id;
  Post.findByIdAndDelete({ _id: postId }, (err, deleted) => {
    if (err) {
      console.log(err)
    }
    res.json(deleted)
  });
};

module.exports.editPost_patch = async (req, res) => {
  const postId = req.query.post_id;
  const body = req.body.body;
  Post.findByIdAndUpdate(postId, {
    body: `${body}`,
  }, (err, res) => {
    if (err) {
      console.log(err)
    }
    console.log(res)
  })
}

module.exports.addLike_patch = async (req, res) => {
  const postId = req.query.post_id;
  const likes = req.body.likes;
  Post.findByIdAndUpdate(postId, {
    likes: `${likes}`,
  }, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.json(result.likes)
  })
}
