import mongoose, { Schema } from "mongoose";
import { Sites } from "../types/adminTypes";

const siteSchema: Schema<Sites> = new mongoose.Schema({
  siteId: String,
  siteName: String,
});

const siteModel = mongoose.model<Sites>("sites", siteSchema);
export default siteModel;
