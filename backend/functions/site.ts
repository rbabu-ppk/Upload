import csvParser from "csv-parser";
import { Sites } from "../types/adminTypes";
import siteModel from "../models/siteModel";

export const siteFunction = async (uploadedFile: any) => {
  const sites: Sites[] = [];
  const csvData = uploadedFile.buffer.toString("utf8");

  const parseStream = csvParser()
    .on("data", async (data) => {
      const siteName = data.siteName;
      const siteId = data.siteId;
      sites.push({ siteName, siteId });
    })
    .on("end", async () => {
      try {
        console.log(sites);

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
      } catch (error) {
        console.log(error);
      }
    });

  const csvStream = require("stream").PassThrough();
  csvStream.end(csvData);
  csvStream.pipe(parseStream);
};
