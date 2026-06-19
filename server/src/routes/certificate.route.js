import express from "express";
import { upload } from "../middleware/multer.js";
import { uploadCertificate } from "../controllers/certificate.controller.js";

export const certificate = express.Router();

// upload certificate
certificate.post(
  "/certificate/upload",
  upload.single("sertifikat"),
  uploadCertificate,
);

// verify certificate
certificate.get("/certificate/verify/:id");
