const express = require('express');

const authController = require('../controllers/auth.controller');

const validations = require('../middlewares/validations.middleware');

const router = express.Router();

router.post('/signup', validations.createUserValidation, authController.signup);
router.post('/login', validations.loginUserValidation, authController.login);

module.exports = router;
