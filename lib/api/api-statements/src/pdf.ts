import fs from "fs"; // NOTE: for browser builds need to make fs external
import path from "path"; // NOTE: for browser builds need to make path external
import * as constants from "./constants";
import InputValidationError from "./lib/inputValidationError";
import PdfTooLargeError from "./lib/pdfTooLargeError";
import request from "./lib/req";
import { PdfRequest } from "./request";

export default async function pdf(TOKEN, pdfPath, pass = undefined, buffer = undefined) {
  // inputs
  const inputs = create(pdfPath, pass, buffer);

  // request
  const url = constants.url;
  return await request(TOKEN, url, inputs);
}

function create(pdfPath, pass, buffer) {
  if (!buffer && !pdfPath) {
    throw new InputValidationError(["must supply pdfPath or buffer"]);
  }
  if (buffer) {
    if (!isBase64EncodedPdf(buffer)) {
      throw new InputValidationError("invalid buffer: either not a PDF or not base64 encoded");
    }
    if (!pdfPath) {
      // supplied buffer but didn't say what original filename was
      pdfPath = "not-supplied";
    }
  } else {
    // supplied pdfPath only - not buffer
    buffer = fs.readFileSync(pdfPath); // NOTE: for browser builds need to make fs external
    buffer = buffer.toString("base64");
  }

  if (buffer.length > PdfTooLargeError.Max) {
    throw new PdfTooLargeError();
  }

  const instance: PdfRequest = {
    file: path ? path.basename(pdfPath) : pdfPath,
    buffer,
    pass,
  };
  return instance;
}

function isBase64EncodedPdf(pdfString) {
  return pdfString.slice(0, 5) == "JVBER"; // Buffer.from("%PDF").toString('base64')
}
