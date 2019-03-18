const express = require("express");
const multer = require("multer");
const multerConfig = require("./configs/multer");

// Routes config
const routes = express.Router();

// Controller
const PdfController = require("./controllers/PdfController");
const IbmController = require("./controllers/IbmController");

// PDF
routes.post(
  "/pdf/send",
  multer(multerConfig).single("file"),
  PdfController.storePdf
); // Receive the PDF file
routes.get("/pdf/read", PdfController.readPdf); // Read the PDF file

// Watson
routes.post("/watson/text", IbmController.text2Speech); // Connect with the IBM and
routes.post("/watson/voices", IbmController.listVoices); // List all IBM Watson voices
routes.get("/watson/audio", IbmController.showAudio); // Show only one voice

module.exports = routes;
