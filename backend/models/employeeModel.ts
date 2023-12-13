import mongoose, { Schema } from "mongoose";
import { Employees } from "../types/adminTypes";

const employeeSchema: Schema<Employees> = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  siteId: String,
  departmentId: String,
});

const employeeModel = mongoose.model<Employees>("employees", employeeSchema);
export default employeeModel;
