const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = mongoose.model("Book", bookSchema);
