const mongoose = require('mongoose');

exports.PORT = process.env.PORT || 8000;

exports.connectToMongoDb = () => {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log('Connected to MongoDB!')
  );

  mongoose.connection.on('error', (err) => {
    console.log('Error in connection Mongo', err);
  });
};

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    success: false,
    msg: error.message || 'Something went wrong',
    data: null,
    errors: error.errorArray || [],
  });
};

/**
 *
 * @param {*} res
 * @param {Number} code
 * @param {Boolean} success
 * @param {String} message
 * @param {Array} errors
 * @param {Object} data
 * @returns
 */
 exports.response = (res, code, success, message, errors, data) => {
    return res.status(code).json({
      success,
      msg: message,
      data: data ? data : null,
      errors: errors?.length > 0 ? errors : [],
    });
  };
  
