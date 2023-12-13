import csvParser from "csv-parser";
import { Departments, Employees, Sites } from "../types/adminTypes";
import employeeModel from "../models/employeeModel";
import siteModel from "../models/siteModel";
import departmentModel from "../models/departmentModel";

export const employeeFunction = async (uploadedFile: any) => {
  const employees: Employees[] = [];
  const departments: Departments[] = [];
  const sites: Sites[] = [];
  const csvData = uploadedFile.buffer.toString("utf8");

  const parseStream = csvParser()
    .on("data", async (data) => {
      const firstName = data.firstname;
      const lastName = data.lastname;
      const address = data.address;
      const siteId = data.siteId;
      const departmentName = data.departmentName;
      const siteName = data.siteName;
      const departmentId = data.departmentId;
      const id = data.id;
      employees.push({
        id,
        firstName,
        lastName,
        address,
        siteId,
        departmentId,
      });
      departments.push({ departmentId, departmentName });
      sites.push({ siteId, siteName });
    })
    .on("end", async () => {
      try {
        for (const employee of employees) {
          const existingDepartment = await employeeModel.find({
            employeeName: employee.firstName,
          });
          if (!existingDepartment) {
            await employeeModel.create(employee);
          } else {
            console.log("available");
          }
        }
        for (const site of sites) {
          const existingSite = await siteModel.find({
            siteName: site.siteName,
          });
          if (!existingSite) {
            await siteModel.create(site);
          } else {
            console.log("available");
          }
        }
        for (const department of departments) {
          const existingDepartment = await departmentModel.find({
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
