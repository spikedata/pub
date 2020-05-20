import * as Shapes from "./shapes";
import * as Enums from "./enums";

export function isUserError(response) {
  const isError = Enums.TYPES.ERROR === response.type;
  if (!isError) return false;
  // check shape
  const shape = Shapes.getShape(response.code);
  return shape.blame == Enums.BLAME.USER;
}
