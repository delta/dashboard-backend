import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  name: Number,
  hostelName: String,
  roomNumber: Number,
});

export const UserDetails = mongoose.model("UserDetails", userDetailSchema);
