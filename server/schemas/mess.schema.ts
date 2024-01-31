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
  location: {
    type: String,
    unique: true,
  },
  rating: Number,
  batch: {
    type: String,
    enum: batches,
  },
  hostelName: [String],
});

export const Mess = mongoose.model("Mess", messSchema);
export type Mess = typeof Mess;
