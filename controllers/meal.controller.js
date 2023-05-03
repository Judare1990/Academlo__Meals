const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res) => {
  const { name, price } = req.body;

  const { id } = req.params;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: 'success',
    meal,
  });
});

exports.getAllMeals = catchAsync(async (req, res) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: {
      model: Restaurant,
      attributes: ['name', 'address', 'rating'],
    },
  });

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.getMealById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: {
      model: Restaurant,
      attributes: ['name', 'address', 'rating'],
    },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'fail',
      message: 'Meal not found',
    });
  }

  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'fail',
      message: 'Meal not found',
    });
  }

  await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.disableMeal = catchAsync(async (req, res) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'fail',
      message: 'Meal not found',
    });
  }

  await meal.update({
    status: 'disabled',
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
