const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');
const Review = require('./review.model');
const User = require('./user.model');
const Order = require('./order.model');

const initModel = () => {
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  User.hasMany(Review);
  Review.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
