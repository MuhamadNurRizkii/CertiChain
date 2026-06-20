import { PDFDocument } from "pdf-lib";
import { generateQR } from "../utils/generateQR.js";

export const embedQR = async (pdf, url) => {
  const qr = await generateQR(url);

  const pdfDoc = await PDFDocument.load(pdf);
  const base64 = qr.replace(/^data:image\/png;base64,/, "");

  const qrImage = await pdfDoc.embedPng(Buffer.from(base64, "base64"));

  const page = pdfDoc.getPages()[0];

  page.drawImage(qrImage, {
    x: 480,
    y: 60,
    width: 100,
    height: 100,
  });

  const modifiedPdf = await pdfDoc.save();

  return Buffer.from(modifiedPdf);
};
