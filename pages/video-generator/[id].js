import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { VideoModels } from "@/lib/models";
import KandinSky from "../../components/formContent/kandinsky";
import Tokenflow from "../../components/formContent/tokenflow";
import Iv2gen from "../../components/formContent/i2vgen";
import Videocrafter from "../../components/formContent/videocrafter";
import Lavie from "../../components/formContent/lavie";
import StableDiffusion from "../../components/formContent/stablediffusion";
import DiffusionAnimation from "../../components/formContent/diffusionAnimation";
import InfiniteZoom from "../../components/formContent/infiniteZoom";
import { v4 as uuidv4 } from "uuid";
import Lightning from "@/components/formContent/lightning";

const VideoGenerator = () => {
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

  const generateVideo = (prompt) => {
    setLoading(true);
    setError(null);

    const model = VideoModels[id - 1];
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
          <KandinSky
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 2:
        res = (
          <Tokenflow
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 3:
        res = (
          <Iv2gen
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 4:
        res = (
          <Videocrafter
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 5:
        res = (
          <Lavie
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 6:
        res = (
          <StableDiffusion
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 7:
        res = (
          <DiffusionAnimation
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 8:
        res = (
          <InfiniteZoom
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
            prediction={prediction}
          />
        );
        break;
      case 9:
        res = (
          <Lightning
            model={VideoModels[id - 1]}
            generateVideo={generateVideo}
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

  return <div className="mt-2 py-5 px-20">{formContent}</div>;
};

export default VideoGenerator;
