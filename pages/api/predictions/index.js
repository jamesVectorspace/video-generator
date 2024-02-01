import upsertPrediction from "../../../lib/upsertPrediction";
import AiModels from "../../../lib/models";
import packageData from "../../../package.json";
import fetch from "node-fetch";

const REPLICATE_API_HOST = "https://api.replicate.com";

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const modelName = req.body.model;
  const modelObject = AiModels.filter((model) => model.name === modelName)[0];

  if (!modelObject) {
    throw new Error(`Model ${modelName} not found`);
  }

  const body = JSON.stringify({
    input: {
      ...req.body.parameters,
      // ...modelObject.default_params,
    },
    version: modelObject.version,
  });

  const headers = {
    Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
    "User-Agent": `${packageData.name}/${packageData.version}`,
  };

  const response = await fetch(`${REPLICATE_API_HOST}/v1/predictions`, {
    method: "POST",
    headers,
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
