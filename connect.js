// Short-URL/connect.js
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = {
  connectToMongoDB,
};
