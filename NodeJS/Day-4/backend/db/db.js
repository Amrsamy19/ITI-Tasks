const mongoose = require("mongoose");
const { mongoUrl } = require("../utils/utils");

async function connectDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Could not connect:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
