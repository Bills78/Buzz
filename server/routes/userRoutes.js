const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/new-user', (req, res) => {
  const { password, username, email } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const user = new User({
      username: `${username}`,
      email: `${email}`,
      password: `${hash}`
    });

    user.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
  });
});

router.post('/log-in', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const cmpr = await bcrypt.compare(password, user.password);
      if (cmpr) {
        res.send('Auth successful!');
        console.log('Auth successful!');
      } else {
        res.send('Wrong password...');
        console.log('Wrong password...');
      }
    } else {
      res.send('Wrong username...');
      console.log('Wrong username...');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error...')
  }
});

module.exports = router;