const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/new-user', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const user = new User({
      username: `${req.body.username}`,
      email: `${req.body.email}`,
      password: `${hash}`
    });

    user.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
    .catch(err => {
      console.log(err)
    })
  });
});

module.exports = router;