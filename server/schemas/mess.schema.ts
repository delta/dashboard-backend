import mongoose from "mongoose";
import { batches } from "../utils/constants";

const messSchema = new mongoose.Schema({
  messName: {
    type: String,
    unique: true,
  },
  population: {
    type: Number,
    default: 0,
  },
  capacity: Number,
  location: [String],
  rating: Number,
  batch: {
    type: String,
    enum: batches,
  },
  hostelNames: [String],
});

export const Mess = mongoose.model("Mess", messSchema);
export type Mess = typeof Mess;
