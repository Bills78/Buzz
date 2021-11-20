const Post = require('../models/posts');

module.exports.newPost_post = async (req, res) => {
  const { body } = req.body;
  const username = req.user.username;
  
  const post = new Post({
    body,
    postedBy: username
  });
  
  post.save()
  .then(result => res.json({post: result}))
  .catch(err => console.log(err));
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
  res.json(posts);
}

module.exports.deletePost_delete = async (req, res) => {
  const postId = req.query.post_id;
  const username = req.user.username;
  Post.findByIdAndDelete({ _id: postId }, (err, docs) => {
    if (err) {
      console.log(err)
    }
    else { 
      console.log('deleted: ', docs)
    }
  });

  const posts = await Post.find({postedBy: username}).sort({createdAt: -1})
  res.json(posts)
}