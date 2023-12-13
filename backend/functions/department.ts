import csvParser from "csv-parser";
import { Departments, Sites } from "../types/adminTypes";
import departmentModel from "../models/departmentModel";

export const departmentFunction = async (uploadedFile: any) => {
  const departments: Departments[] = [];
  const dbDepartments: Record<string, Departments> = {};
  const csvData = uploadedFile.buffer.toString("utf8");

  const dbRecords = await departmentModel.find({});
  dbRecords.forEach((dept) => {
    dbDepartments[dept.departmentName] = dept;
  });

  const parseStream = csvParser()
    .on("data", async (data) => {
      const departmentName = data.departmentName;
      const departmentId = data.departmentId;
      const department: Departments = { departmentId, departmentName };

      if (!dbDepartments[departmentName]) {
        dbDepartments[departmentName] = department;
        departments.push(department);
      } else {
        console.log("Record exists");
      }
    })
    .on("end", async () => {
      try {
        await departmentModel.insertMany(departments);
      } catch (error) {
        console.log(error);
      }
    });

  const csvStream = require("stream").PassThrough();
  csvStream.end(csvData);
  csvStream.pipe(parseStream);
};
