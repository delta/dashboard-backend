import mongoose from "mongoose";

const constantsSchema = new mongoose.Schema({
  constKey: {
    type: String,
    unique: true,
  },
  description: String,
  type: String,
  value: mongoose.Schema.Types.Mixed,
});

export const Constants = mongoose.model("Constants", constantsSchema);
