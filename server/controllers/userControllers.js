const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const maxAge = 1000 * 60 * 60 * 24;

module.exports.newuser_post = (req, res) => {
  const { password, username, email } = req.body;

  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
    const user = await new User({
      username: `${username}`,
      email: `${email}`,
      password: `${hash}`,
      liked: [],
    });

    const token = jwt.sign(
      { user_id: user.id, username }, 
      process.env.TOKEN_KEY,{
      expiresIn: maxAge
      });

    user.save()
      .then(() => {
        res.status(200).json({ token });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Database error...' })
      });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error...' })
  };
};

module.exports.login_post = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user.id, username },
        process.env.TOKEN_KEY,{
          expiresIn: maxAge
        });

      res.status(200).json({ token });
      } else if (!user) {
        res.status(401).json({ message: 'Incorrect username...'});
      } else {
        res.status(401).json({ message: 'Inccorect password...' })
      }
  } catch (err) {
    console.log(err);
  }
};

module.exports.likedPost_get = async (req, res) => {
  postId = req.query.post_id;
  username = req.user.username;
  User.find({ username }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      const isLiked = result[0].liked.includes(postId);
      res.json({ data: isLiked })
    }
  })
}

module.exports.addLiked_patch = async (req, res) => {
  postId = req.body.postId;
  username= req.user.username;
  User.updateOne({ username }, { $addToSet: { liked: [`${postId}`]}},
    (err, result) => {
      if(err) {
        res.json(err.message)
      }
      console.log(result)
    })
}

module.exports.removeLiked_patch = async (req, res) => {
  postId = req.body.postId;
  username= req.user.username;
  User.updateOne({ username }, { $pullAll: { liked: [`${postId}`]}},
    (err, result) => {
      if(err) {
        res.json(err.message)
      }
      res.json(result)
    })
}
