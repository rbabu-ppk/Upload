import express, { NextFunction, Request, Response } from "express";
import * as services from "../services/uploadService";
import multer from "multer";
import csvParser from "csv-parser";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uploadedFile = req.file;
    const email = req.body.email;
    const selectedOption = req.body.selectedOption;

    const result = await services.uploadFileService(
      email,
      selectedOption,
      uploadedFile
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "No dta found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to upload file" });
  }
};
