import chai from "chai";
import chaiUuid from "chai-uuid";
import * as API from "../../../build/module/index.mjs";
import * as uuid from "../../../build/module/lib/uuid.mjs";
import * as gwLambdaComposer from "../../../build/module/gw-lambda/bchan/composer.mjs";

//#region chai setup

const { expect } = chai;
chai.use(chaiUuid);

//#endregion

describe("client-gw validaters", function () {
  const codes = Object.keys(API.shape).filter((x) => x.startsWith("client-gw"));
  for (const code of codes) {
    const testname = `validate API/${code}`;
    it(testname, async function () {
      const shape = API.shape[code];
      let errors;

      // can skip no data
      if (shape.noData) {
        expect(shape.examples).to.be.undefined;
        return;
      }

      // Uncomment in order to debug specific shape
      // if (code === "client-gw/login-interim-input/std-otp") {
      //   debugger;
      // }

      // make sure we have a default example
      expect(shape.examples).to.not.be.undefined;
      const examples = Object.keys(shape.examples);
      for (const example of examples) {
        const clientGwInstance = shape.examples[example];
        if (shape.validate) {
          errors = API.common.validateShape(shape, clientGwInstance);
          expect(errors).to.be.undefined;
        } else {
          log.warn(`API/${code}: does not have a .validate`);
        }

        // make sure bchan shapes conform to "client-gw/composer/*".composeSchema
        if (shape.channel === API.enums.Channel.Bchan) {
          const requestId = uuid.testUuid();
          const gwLambdaInstance = gwLambdaComposer.decompose(requestId, shape, clientGwInstance);
          errors = gwLambdaComposer.validate(gwLambdaInstance);
          expect(errors).to.be.undefined;
        }
      }
    });
  }
});

describe("client-gw sanitizers", function () {
  /* */

  // Just doing one or two manually - these tests will be brittle

  it("sanitize pdf", async function () {
    const shape = API.shape["client-gw/pdf"];
    expect(shape.examples).to.not.be.undefined;
    const examples = Object.keys(shape.examples);
    for (const example of examples) {
      const sanitized = API.common.sanitize(shape.sanitize, shape.examples[example]);
      // log.info(example, sanitized);
      expect(sanitized).to.nested.include({
        buffer: "[redacted]",
      });
    }
  });

  /* */
});
