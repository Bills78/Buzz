const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.post('/new-user', authController.newuser_post);

router.post('/log-in', authController.login_post);

module.exports = router;