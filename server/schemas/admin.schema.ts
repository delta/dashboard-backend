import mongoose from "mongoose";

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
      type: String,
      enum: [
        "GetMessList",
        "GetMessUnallottedUsers",
        "OpenOrCloseMessRegistration",
        "MessAllotment",
      ],
    },
  ],
});

export const Admins = mongoose.model("Admins", adminsSchema);
export type Admins = typeof Admins;
