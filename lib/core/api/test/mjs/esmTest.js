import spikeApi from "@spike/api";
// import { testUuid } from "@spike/api/esm/lib/uuid.mjs";

let requestId = "00000000-0000-4000-a000-000000000000"; // testUuid();
let shape =
  spikeApi.shape[
    "gw-client/error/common/access/exceeded-max-concurrent-requests"
  ];

let response = spikeApi.response.create(
  requestId,
  undefined,
  shape.code,
  shape.type
);

console.log("response", JSON.stringify(response));
spikeApi.response.validate(response);
console.log("OK");
