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

exports.createMealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a number greater than 0'),

  this.validateFields,
];
