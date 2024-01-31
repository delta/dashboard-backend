import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  hostelName: String,
  roomNumber: Number,
});

export const UserDetail = mongoose.model("UserDetail", userDetailSchema);
export type UserDetail = typeof UserDetail;
