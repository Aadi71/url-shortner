const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = { connectToMongoDB };
