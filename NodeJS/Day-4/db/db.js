const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/library");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Could not connect:", err);
    process.exit(1); // stop server if DB fails
  }
}

module.exports = connectDB;
