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
      password: `${hash}`
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
