import mongoose from "mongoose";

const genderScheme = new mongoose.Schema({
  value: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
    unique: true,
  },
});

export const Gender = mongoose.model("Gender", genderScheme);
