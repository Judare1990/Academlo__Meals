const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const userId = req.user.id;

  const meal = await Meal.findByPk(mealId);

  if (!meal) {
    return next(new AppError('The food does not exist.', 404));
  }

  const price = meal.price * quantity;

  const order = await Order.create({
    mealId,
    userId,
    totalPrice: price,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const orders = await Order.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['id', 'name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const order = await Order.findOne({
    where: {
      id,
      userId,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError('The order was not found.', 404));
  }

  order.status = 'completed';
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const order = await Order.findOne({
    where: {
      id,
      userId,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError('The order was not found.', 404));
  }

  order.status = 'cancelled';
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});
