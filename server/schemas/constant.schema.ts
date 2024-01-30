import mongoose from "mongoose";

const constantsSchema = new mongoose.Schema({
  constKey: {
    type: String,
    unique: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["One", "Two", "Three"],
  },
  value: mongoose.Schema.Types.Mixed,
});

export const Constants = mongoose.model("Constants", constantsSchema);
export type Constants = typeof Constants;
