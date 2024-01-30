import mongoose from "mongoose";

const messesSchema = new mongoose.Schema({
  messName: {
    type: String,
    unique: true,
  },
  population: {
    type: Number,
    default: 0,
  },
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
export type Messes = typeof Messes;
