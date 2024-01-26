import mongoose from "mongoose";

const messesSchema = new mongoose.Schema({
  messName: {
    type: String,
    unique: true,
  },
  population: Number,
  capacity: Number,
  location: {
    type: String,
    unique: true,
  },
  rating: Number,
  batches: [String],
  hostelNames: [String],
});

export const Messes = mongoose.model("Messes", messesSchema);
