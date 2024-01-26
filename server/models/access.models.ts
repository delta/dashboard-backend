import mongoose from "mongoose";

const accessSchema = new mongoose.Schema({
  value: {
    type: String,
    enum: [
      "GetMessList",
      "GetMessUnallottedUsers",
      "OpenOrCloseMessRegistration",
      "MessAllotment",
    ],
    required: true,
    unique: true,
  },
});

export const Access = mongoose.model("Access", accessSchema);
