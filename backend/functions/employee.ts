import csvParser from "csv-parser";
import { Departments, Employees, Sites } from "../types/adminTypes";
import employeeModel from "../models/employeeModel";
import siteModel from "../models/siteModel";
import departmentModel from "../models/departmentModel";

export const employeeFunction = async (uploadedFile: any) => {
  const employees: Employees[] = [];
  const departments: Departments[] = [];
  const sites: Sites[] = [];

  const dbEmployeRecords: Record<string, Employees> = {};
  const dbDepartments: Record<string, Departments> = {};
  const dbSites: Record<string, Sites> = {};

  const dbEmployees = await employeeModel.find({});
  dbEmployees.forEach((emp) => {
    dbEmployeRecords[emp.firstName] = emp;
  });

  const dbDepartmentRecords = await departmentModel.find({});
  dbDepartmentRecords.forEach((dept) => {
    dbDepartments[dept.departmentName] = dept;
  });

  const dbSiteRecords = await siteModel.find({});
  dbSiteRecords.forEach((site) => {
    dbSites[site.siteName] = site;
  });

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

      const employee: Employees = {
        id,
        firstName,
        lastName,
        address,
        siteId,
        departmentId,
      };
      const department: Departments = { departmentId, departmentName };
      const site: Sites = { siteId, siteName };

      if (!dbEmployeRecords[firstName]) {
        dbEmployeRecords[firstName] = employee;
        employees.push(employee);
      } else {
        console.log("Record Exists");
      }
      if (!dbDepartments[departmentName]) {
        dbDepartments[departmentName] = department;
        departments.push(department);
      } else {
        console.log("Record exists");
      }
      if (!dbSites[siteName]) {
        dbSites[siteName] = site;
        sites.push(site);
      } else {
        console.log("Record Exists");
      }
    })
    .on("end", async () => {
      try {
        await employeeModel.insertMany(employees);
        await departmentModel.insertMany(departments);
        await siteModel.insertMany(sites);
      } catch (error) {
        console.log(error);
      }
    });

  const csvStream = require("stream").PassThrough();
  csvStream.end(csvData);
  csvStream.pipe(parseStream);
};
