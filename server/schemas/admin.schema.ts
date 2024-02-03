import mongoose from "mongoose";
import { accesses } from "../utils/constants";

const adminSchema = new mongoose.Schema({
  webmail: {
    type: String,
    unique: true,
  },
  description: String,
  isStudent: {
    type: Boolean,
    default: false,
  },
  access: [
    {
      type: String,
      enum: accesses,
    },
  ],
});

export const Admin = mongoose.model("Admin", adminSchema);
export type Admin = typeof Admin;
