const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    name: { type: String },
  },
  { versionKey: false }
);

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    bookCoverImage: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    price: { type: Number, required: true, min: 0 },
    publishedYear: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);

module.exports = { User, Book };
