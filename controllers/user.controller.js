const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

const catchAsync = require('../utils/catchAsync');

exports.findUserOrders = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.findAll({
    where: {
      userId,
      status: 'active',
    },

    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
      },
      {
        model: Restaurant,
        attributes: ['name', 'address', 'rating'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.getUserOrderById = catchAsync(async (req, res) => {
  const { userId, orderId } = req.params;

  const order = await Order.findOne({
    where: {
      id: orderId,
      userId,
      status: 'active',
    },

    include: [
      {
        model: Meal,
        attributes: ['name'],
      },
      {
        model: Restaurant,
        attributes: ['name'],
      },
    ],
  });

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found',
    });
  }

  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });
  return res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });
  return res.status(200).json({
    status: 'success',
    message: 'the user has been deleted',
  });
});
