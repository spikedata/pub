import * as Core from "./core";

// resolve:
//  resolves all nested shapes recursively so that parent shape only needs to know
//  immediate children (not all children of children)
const debugResolve = false; // use with ../Client/test/data.js & ../Client/test/debugData.js
export const resolve = function (path, arrayOfNestedShapes) {
  if (debugResolve) {
    console.log(`Find nested on ${path}`);
  }
  const deps = {
    schemas: [],
    shapes: [],
  };
  let ok = true;
  for (const child of arrayOfNestedShapes) {
    if (!child.validate) {
      log.fatal(`${path}: bad nested deps - child ${child.id} does not have .validate`);
      ok = false;
    } else {
      // check valid nestable shape
      if (Core.isFunction(child.validate)) {
        log.fatal(`${path}: bad nested deps - child has custom function .validate instead of a schema`);
        ok = false;
      }
      if (!Core.isObject(child.validate)) {
        log.fatal(`${path}: bad nested deps - child .validate is not a schema object`);
        ok = false;
      }
      if (!child.validate.id) {
        log.fatal(`${path}: bad nested deps - child does not have an .id`);
        ok = false;
      }
      // child is a valid netsable shape - include it in deps
      deps.schemas.push(child.validate);
      deps.shapes.push(child);
      // now see whether the child has any nested deps
      const childPath = path + ":" + child.validate.id;
      if (child.nested) {
        const childDeps = resolve(childPath, child.nested);
        if (childDeps && childDeps.schemas && childDeps.schemas.length) {
          if (debugResolve) {
            console.log(`found childDeps on ${childPath}`, childDeps);
          }
          deps.schemas = deps.schemas.concat(childDeps.schemas);
          deps.shapes = deps.shapes.concat(childDeps.shapes);
        }
      } else {
        if (debugResolve) {
          console.log(`no .nested on ${childPath}`);
        }
      }
    }
  }
  if (!ok) {
    throw new Error(`${path}: bad nested deps`);
  }
  if (debugResolve) {
    console.log(`Resolved ${path}: ${JSON.stringify(deps, null, 2)}`);
  }
  return deps;
};
