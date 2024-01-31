import mongoose from "mongoose";

const constantSchema = new mongoose.Schema({
  constKey: {
    type: String,
    unique: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["Number", "String", "Object", "Array"],
  },
  value: mongoose.Schema.Types.Mixed,
});

export const Constant = mongoose.model("Constant", constantSchema);
export type Constant = typeof Constant;
