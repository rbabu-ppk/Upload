// server.js
import express from "express";
import * as controller from "../controllers/uploadController";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), controller.uploadFile);

export default router;
