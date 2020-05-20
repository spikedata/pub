// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class ShapeNotFoundError extends Error {
  code: string;

  constructor(code) {
    super("Shape code does not exist: " + code);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ShapeNotFoundError);
    }
    this.name = "ShapeNotFoundError";
    this.code = code;
  }
}
export default ShapeNotFoundError;
