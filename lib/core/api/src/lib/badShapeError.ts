// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

class BadShapeError extends Error {
  constructor(message) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadShapeError);
    }

    this.name = "BadShapeError";
  }
}

export default BadShapeError;
