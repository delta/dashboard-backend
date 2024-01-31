import mongoose from "mongoose";

const userMessDetailSchema = new mongoose.Schema({
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

export const UserMessDetail = mongoose.model(
  "UserMessDetail",
  userMessDetailSchema
);
export type UserMessDetail = typeof UserMessDetail;
