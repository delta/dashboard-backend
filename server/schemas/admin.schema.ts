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

const adminsSchema = new mongoose.Schema({
  webmail: {
    type: String,
    unique: true,
  },
  description: String,
  isStudent: {
    type: Boolean,
    default: false,
  },
  accesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Access",
    },
  ],
});

export const Admins = mongoose.model("Admins", adminsSchema);
export type Admins = typeof Admins;
