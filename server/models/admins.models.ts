import mongoose from "mongoose";

const adminsSchema = new mongoose.Schema({
  webmail: {
    type: String,
    unique: true,
  },
  description: String,
  isStudent: Boolean,
  accesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Access",
    },
  ],
});

export const Admins = mongoose.model("Admins", adminsSchema);
