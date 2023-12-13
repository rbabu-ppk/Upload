import csvParser from "csv-parser";
import { Sites } from "../types/adminTypes";
import siteModel from "../models/siteModel";

export const siteFunction = async (uploadedFile: any) => {
  const sites: Sites[] = [];
  const dbSites: Record<string, Sites> = {};
  const csvData = uploadedFile.buffer.toString("utf8");

  const dbRecords = await siteModel.find({});
  dbRecords.forEach((site) => {
    dbSites[site.siteName] = site;
  });

  const parseStream = csvParser()
    .on("data", async (data) => {
      const siteName = data.siteName;
      const siteId = data.siteId;
      const site: Sites = { siteId, siteName };

      if (!dbSites[siteName]) {
        dbSites[siteName] = site;
        sites.push(site);
      } else {
        console.log("Record Exists");
      }
    })
    .on("end", async () => {
      try {
        await siteModel.insertMany(sites);
      } catch (error) {
        console.log(error);
      }
    });

  const csvStream = require("stream").PassThrough();
  csvStream.end(csvData);
  csvStream.pipe(parseStream);
};
