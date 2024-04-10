import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ImageModels } from "@/lib/models";
import Cinematic from "@/components/imageForm/cinematic";
import { v4 as uuidv4 } from "uuid";

const ImageGenerator = () => {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState();
  const [loading, setLoading] = useState(false);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // no image
  async function postPrediction(parameters, model, submissionId) {
    return fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameters,
        model,
        submission_id: submissionId,
      }),
    });
  }

  async function createReplicatePrediction(prompt, model, submissionId) {
    const response = await postPrediction(prompt, model, submissionId);
    let prediction = await response.json();

    if (response.status !== 201) {
      throw new Error(prediction.detail);
    }
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        throw new Error(prediction.detail);
      }
    }

    prediction.model = model.name;
    prediction.source = model.source;
    return prediction;
  }

  const generateImage = (prompt) => {
    setLoading(true);
    setError(null);

    const model = ImageModels[id - 1];
    const submissionId = uuidv4();
    let promise = createReplicatePrediction(prompt, model, submissionId);
    promise.model = model.name;
    promise.source = model.source;
    promise.version = model.version;
    setPrediction(promise);

    promise
      .then((result) => {
        console.log("result updated!", result);
        setPrediction(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const formContent = useMemo(() => {
    let res = <></>;
    switch (Number(id)) {
      case 1:
        res = (
          <Cinematic
            model={ImageModels[id - 1]}
            generateImage={generateImage}
            prediction={prediction}
          />
        );
        break;
      default:
        res = <></>;
        break;
    }
    return res;
  }, [id, prediction]);

  return (
    <div className="mt-2 py-5 px-20">
      <div className="flex justify-center mb-4">
        <img
          className="w-20 h-20"
          src={"/assets/baseai.jpg"}
          alt="baseai logo"
        />
      </div>
      {formContent}
    </div>
  );
};

export default ImageGenerator;
