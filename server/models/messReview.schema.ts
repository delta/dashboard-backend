import mongoose from "mongoose";

const messReviewsSchema = new mongoose.Schema({
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

export const MessReviews = mongoose.model("MessReviews", messReviewsSchema);
