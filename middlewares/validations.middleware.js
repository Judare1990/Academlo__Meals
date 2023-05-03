const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 characters'),

  this.validateFields,
];

exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),

  this.validateFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 characters'),

  this.validateFields,
];

exports.updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 characters'),
  body('newPassword')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 characters'),

  this.validateFields,
];
