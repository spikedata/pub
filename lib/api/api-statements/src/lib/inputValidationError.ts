// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class InputValidationError extends Error {
  validationErrors: string[];

  constructor(validationErrorsArray) {
    super("Spike input validation error");
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InputValidationError);
    }
    this.name = "InputValidationError";
    this.validationErrors = validationErrorsArray;
  }
}
export default InputValidationError;
