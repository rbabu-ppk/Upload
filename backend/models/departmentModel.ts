import mongoose, { Schema } from "mongoose";
import { Departments } from "../types/adminTypes";

const departmentSchema: Schema<Departments> = new mongoose.Schema({
  departmentId: String,
  departmentName: String,
});

const departmentModel = mongoose.model<Departments>(
  "departments",
  departmentSchema
);
export default departmentModel;
