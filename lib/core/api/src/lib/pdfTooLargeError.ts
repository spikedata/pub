// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class PdfTooLargeError extends Error {
  validationErrors: string[];
  static Max = 6 * 1024 * 1024;

  constructor() {
    super("Spike pdf too large error");
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PdfTooLargeError);
    }
    this.name = "PdfTooLargeError";
  }
}
export default PdfTooLargeError;
