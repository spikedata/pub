const chai = require("chai");
const chaiUuid = require("chai-uuid");
const API = require("../../../build/main/index");
const uuid = require("../../../build/main/lib/uuid");

/**
 * GOAL: simulate the logic which is occurring inside GW when response is received from Lambda and must be marshalled / passed to Client
 */

//#region chai setup

const { assert } = chai;
chai.use(chaiUuid);

//#endregion

describe("full response pipeline = lambda-gw-client", function() {
  let shapes = Object.keys(API.shape).filter((x) => x.startsWith("lambda-gw"));
  // log.info(JSON.stringify(shapes, null, 2));

  for (let shape of shapes) {
    let lambdaGwShape;
    let lambdaGwCode = shape;
    let lambdaGwInstance;

    let gwClientShape;
    let gwClientCode;
    // eslint-disable-next-line no-unused-vars
    let gwClientInstance;

    lambdaGwShape = API.shape[lambdaGwCode];
    if (!lambdaGwShape.code) {
      log.info(JSON.stringify(lambdaGwShape, null, 2));
      assert.fail(true, false, `${lambdaGwCode}.code missing`); // throws
    }

    let testname = `${lambdaGwCode} request pipeline`;
    it(testname, async function() {
      try {
        //if (shape === "client-gw/pdf") {
        // debugger;
        //}

        if (!lambdaGwShape.marshallTo && !lambdaGwShape.passThrough && !lambdaGwShape.internal) {
          throw new Error(`${lambdaGwCode} missing .marshallTo || .passThrough`);
        }

        if (!lambdaGwShape.examples && !lambdaGwShape.noData) {
          throw new Error(`${lambdaGwCode} missing .examples`);
        }

        if (lambdaGwShape.internal) {
          log.info(`Skip gw-client marshalling for internal shape: ${lambdaGwCode}`);
        } else if (lambdaGwShape.noData) {
          gwClientInstance = marshallOrPassThrough(lambdaGwShape, lambdaGwCode, undefined);
        } else {
          if (!lambdaGwShape.examples) {
            throw new Error(`${lambdaGwCode} missing .examples`);
          }
          let examples = Object.keys(lambdaGwShape.examples);
          for (let example of examples) {
            // NOTE: we do client-gw.validate() in client-gw.test, just do marshalling here
            lambdaGwInstance = lambdaGwShape.examples[example];
            gwClientInstance = marshallOrPassThrough(lambdaGwShape, lambdaGwCode, lambdaGwInstance);
          }
        }
      } catch (ex) {
        log.error("Exception", ex);
        log.error(lambdaGwCode, lambdaGwShape && JSON.stringify(lambdaGwShape, null, 2));
        log.error(gwClientCode, gwClientShape && JSON.stringify(gwClientShape, null, 2));
        if (global.runtype === global.RUNTYPE.Mocha) {
          assert.fail(true, false, ex.message);
        }
      }
    });
  }
});

function marshallOrPassThrough(lambdaGwShape, lambdaGwCode, lambdaGwInstance) {
  // NOTE: different to request-c-gw-l
  let sessionId;
  if (lambdaGwShape.channel == API.enums.Channel.Bchan) {
    sessionId = uuid.testUuid();
  } else {
    // session is over - don't bother to send back to client
  }
  let wrapper = API.response;
  let gwClientInstance = wrapper.marshall(
    uuid.testUuid(),
    sessionId,
    lambdaGwCode,
    lambdaGwInstance
  );
  wrapper.validate(gwClientInstance); // throws
  return gwClientInstance;
}
