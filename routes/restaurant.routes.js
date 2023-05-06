const express = require('express');

const restaurantController = require('../controllers/restaurant.controller');

const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    authMiddleware.protect,
    restaurantMiddleware.createRestaurantValidation,
    authMiddleware.restrictTo('admin'),
    restaurantController.createRestaurant
  )
  .get(restaurantController.getAllRestaurants);

router
  .route('/:id')
  .get(restaurantController.getRestaurantById)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.disableRestaurant
  );
router
  .route('/reviews/:id')
  .post(authMiddleware.protect, restaurantController.createReview);

router.use(authMiddleware.protect);

router
  .route('/reviews/restaurantId/:id')
  .patch(restaurantController.updateReview)
  .delete(restaurantController.deleteReview);

module.exports = router;
