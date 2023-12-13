import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/routes";
import path from "path";
import { dbConnection } from "./database/database";
const app = express();

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cors());

dbConnection();

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
