import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return mongoose;

  const options = {
    bufferCommands: false,
  };

  return await mongoose.connect(MONGO_URI, options);
};

export default connectToDatabase;
