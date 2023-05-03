const AppError = require('../utils/appError');

const handleCastError = () => {
  return new AppError('Invalid data type sent', 400);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired, please log in again', 401);
};

const handleJWTError = () => {
  return new AppError('Invalid token, please login again', 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.parent?.code === '22P02') {
      error = handleCastError();
    }

    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
