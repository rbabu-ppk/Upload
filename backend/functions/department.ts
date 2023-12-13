import csvParser from "csv-parser";
import { Departments, Sites } from "../types/adminTypes";
import siteModel from "../models/siteModel";
import departmentModel from "../models/departmentModel";

export const departmentFunction = async (uploadedFile: any) => {
  const departments: Departments[] = [];
  const csvData = uploadedFile.buffer.toString("utf8");

  const parseStream = csvParser()
    .on("data", async (data) => {
      const departmentName = data.departmentName;
      const departmentId = data.departmentId;
      departments.push({ departmentName, departmentId });
    })
    .on("end", async () => {
      try {
        for (const department of departments) {
          const existingDepartment = await departmentModel.findOne({
            departmentName: department.departmentName,
          });
          if (!existingDepartment) {
            await departmentModel.create(department);
          } else {
            console.log("available");
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

  const csvStream = require("stream").PassThrough();
  csvStream.end(csvData);
  csvStream.pipe(parseStream);
};
