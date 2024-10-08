const mongoose = require("mongoose");

const connectDB = (URI, dbName) => {
  return mongoose.connect(URI, { dbName });
};

module.exports = connectDB;
