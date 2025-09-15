const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/library");

    console.log("Connected");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = run;
