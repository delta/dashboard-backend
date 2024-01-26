import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gender",
  },
  batch: String,
  messDetailsID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserMessDetails",
  },
});

export const User = mongoose.model("User", usersSchema);
