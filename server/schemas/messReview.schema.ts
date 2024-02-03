import mongoose from "mongoose";

const messReviewSchema = new mongoose.Schema({
  messID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
  rating: Number,
  time: Date,
});

export const MessReview = mongoose.model("MessReview", messReviewSchema);
export type MessReview = typeof MessReview;
