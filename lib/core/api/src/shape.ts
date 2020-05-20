// Shape is the factory which creates the instance
// Each shape has a .code, this lives on the wrapper NOT on the instance though
// makes sense to split factory and instance so that instance is just a JSON object - esp. when serializing and deserializing across network
// see ../docs/shape-system.md
export type ShapeInstance = object;

export type CreateFunction = (...args) => ShapeInstance;
export type ValidateFunction = (ShapeInstance) => string[] | undefined;
export type SanitizeFunction = (ShapeInstance) => string | object;
export type MarshallToFunction = (spikeReq, inputCode, inputData: ShapeInstance) => ShapeInstance;
export type MarshallFromFunction = (spikeReq, inputCode, inputData: ShapeInstance) => ShapeInstance;

export interface Composer {
  compose: (...args) => ShapeInstance;
  decompose: (shape, instance) => ShapeInstance;
}

export type Sanitizer = string | object | SanitizeFunction;

export interface ShapeFactory {
  code: string;
  type: number;
  examples: object;
  noData?: boolean;
  create: CreateFunction;
  validate: object | ValidateFunction;
  schema?: object; // supplied if validate = ValidateFunction, for swagger definition
  sanitize: object | SanitizeFunction;

  // see: /spike/v7/lib/core/api/src/lib/nested.ts
  nested?: any[];
  nestedShapes?: any[];
  nestedSchemas?: any[];
}

export const createUnused: CreateFunction = () => {
  throw new Error("create() is unused");
};

export interface ClientGwShapeFactory extends ShapeFactory {
  firstRequestInSession?: boolean;
  sessionBased: boolean;
  // gw to lambda
  marshallTo?: string | MarshallToFunction;
  channel: number;
}

export interface ClientGwComposedShapeFactory extends ClientGwShapeFactory {
  composer: Composer;
  additionalSchema?: object;
  dataSchema?: object;
  ownSanitize: Sanitizer;
}

export interface GwClientShapeFactory extends ShapeFactory {
  // marshalling
  passThrough?: boolean;
  // other
  noSessionId: boolean;
}
export interface GwClientErrorFactory extends GwClientShapeFactory {
  message?: string;
  blame: number;
}

export interface IWrapper {
  sessionId?: string;
  requestId: string;
  code: string;
  type: number;
  data?: ShapeInstance;
  examples: object;
  wrapperSchema: object;
  create();
  validate(wrappedInstance: ShapeInstance);
  marshall(requestId: string, sessionId: string, inputCode: string, inputData: any);
  sanitize(wrappedInstance: ShapeInstance);
  log(wrappedInstance: ShapeInstance);
}
