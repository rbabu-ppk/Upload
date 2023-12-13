import { departmentFunction } from "../functions/department";
import { employeeFunction } from "../functions/employee";
import { siteFunction } from "../functions/site";
import jobModel from "../models/jobModel";
import { Jobs } from "../types/adminTypes";

export const uploadFileService = async (
  email: Jobs,
  selectedOption: String,
  file: any
) => {
  const status = "In Progress";
  await jobModel.create({ email, status });

  if (selectedOption === "Site") {
    return await siteFunction(file);
  } else if (selectedOption === "Department") {
    return await departmentFunction(file);
  } else if (selectedOption === "Employee") {
    return await employeeFunction(file);
  } else {
    return null;
  }
};
