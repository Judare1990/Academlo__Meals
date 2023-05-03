const express = require('express');

const userController = require('../controllers/user.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/:id')
  .patch(
    authMiddleware.restrictTo('normal'),
    validationMiddleware.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userController.update
  )
  .delete(
    authMiddleware.restrictTo('normal'),
    authMiddleware.protectAccountOwner,
    userController.delete
  );

router.get('/orders', userController.findUserOrders);

router.get('/orders/:id', userController.getUserOrderById);

module.exports = router;
