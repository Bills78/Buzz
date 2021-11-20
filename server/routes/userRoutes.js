const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const auth = require('../middleware/auth');

router.post('/new-user', authController.newuser_post);

router.post('/log-in', authController.login_post);

router.get('/protected', auth, (req, res) => {
  res.send('hello user');
});

module.exports = router;