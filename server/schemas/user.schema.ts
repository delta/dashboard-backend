import { Schema, model } from "mongoose";
import { genders, batches } from "../utils/constants";

export const userSchema = new Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  gender: { type: String, enum: genders, required: true },
  batch: { type: String, enum: batches, required: true },
});

export const userCollection = model("User", userSchema);

export type UserCollection = typeof userCollection;
