export const interimFolder = "/spike/v8/priv/tools/devops/spike-api-tools/data/spikeApi/openapi/interim";
export const finalFolder = "/spike/v8/priv/tools/devops/spike-api-tools/data/spikeApi/openapi/final";
export const openapi = "3.0.1";
export const info = {
  title: "Spike API",
  description: "The Spike API provides access to useful data held by South African banks",
  version: "6.0",
  contact: {
    name: "Spike API",
    url: "https://spikedata.co.za/",
  },
};
export const servers = [
  {
    url: "https://api-v6.spikedata.co.za/",
    description: "API server",
  },
];
export const tags = ["Statements"];
