import mongoose from "mongoose";

const userMessDetailsSchema = new mongoose.Schema({
  messID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess",
  },
  messPreference: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
    },
  ],
  messRegistrationTime: Date,
  isEligibleForRegistering: Boolean,
});

export const UserMessDetails = mongoose.model(
  "UserMessDetails",
  userMessDetailsSchema
);
export type UserMessDetails = typeof UserMessDetails;
