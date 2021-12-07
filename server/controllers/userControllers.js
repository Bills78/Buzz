const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const maxAge = 1000 * 60 * 60 * 24;

module.exports.newuserPost = async (req, res) => {
  const { password, username, email } = req.body;

  const takenName = await User.exists({username});
  console.log(takenName)
  const takenEmail = await User.exists({email});
  console.log(takenEmail)

  try {
    if (takenName && takenEmail) {
      res.status(401).json({ message: 'This account is alrady exists. Try logging in!' });
    } else if (takenName) {
      res.status(401).json({ message: 'This username is already in use. Try a another username!' });
    } else if (takenEmail) {
      res.status(401).json({ message: 'This email is already in use. You may have an account already.' });
    } else {
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
          res.status(500).json({ message: 'Database error...' })
        });
      });
    };
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error...' })
  };
};

module.exports.loginPost = async (req, res) => {
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
        res.status(401).json({ message: 'Incorrect password...' })
      };
  } catch (err) {
    console.log(err);
  };
};