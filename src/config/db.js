const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const x = await mongoose.connect(
      "mongodb://127.0.0.1:27017/spotify-dashboard"
    );
  } catch (error) {
    process.exit(1);
  }
};
module.exports = connectDB;
