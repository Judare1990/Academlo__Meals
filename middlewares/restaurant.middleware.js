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

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),

  body('address').notEmpty().withMessage('address cannot be empty'),

  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Rating must be a number between 1 and 5'),

  this.validateFields,
];
