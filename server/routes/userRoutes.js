const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/new-user', userController.newuserPost);

router.post('/log-in', userController.loginPost);

module.exports = router;
