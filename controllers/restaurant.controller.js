const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    restaurant,
  });
});

exports.getAllRestaurants = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});

exports.getRestaurantById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findByPk(id);

  if (!restaurant || restaurant.status === 'disabled') {
    return res.status(404).json({
      status: 'fail',
      message: 'Restaurant not found',
    });
  }

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const restaurant = await Restaurant.findByPk(id);

  if (!restaurant || restaurant.status === 'disabled') {
    return res.status(404).json({
      status: 'fail',
      message: 'Restaurant not found',
    });
  }

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.disableRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findByPk(id);

  if (!restaurant || restaurant.status === 'disabled') {
    return res.status(404).json({
      status: 'fail',
      message: 'Restaurant not found',
    });
  }

  await restaurant.update({
    status: 'disabled',
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const review = await Review.create({
    comment: req.body.comment,
    rating: req.body.rating,
    restaurantId: id,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  const { restaurantId, id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: 'Review not found',
    });
  }

  if (req.user.id !== review.userId) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to update this review',
    });
  }

  review.comment = req.body.comment;
  review.rating = req.body.rating;
  await review.save();

  res.status(200).json({
    status: 'success',
    review,
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const { restaurantId, id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: 'Review not found',
    });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to perform this action',
    });
  }

  review.status = 'deleted';
  await review.save();

  res.status(204).send();
});
