import mongoose, { Schema } from "mongoose";
import { Jobs } from "../types/adminTypes";

const jobSchema: Schema<Jobs> = new mongoose.Schema({
  email: String,
  status: String,
});

const jobModel = mongoose.model<Jobs>("jobs", jobSchema);
export default jobModel;
