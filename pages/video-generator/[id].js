import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AiModels from "@/lib/models";
import KandinSky from "../components/formContent/kandinsky";
import Tokenflow from "../components/formContent/tokenflow";
import Iv2gen from "../components/formContent/i2vgen";
import Videocrafter from "../components/formContent/videocrafter";
import Lavie from "../components/formContent/lavie";
import StableDiffusion from "../components/formContent/stablediffusion";
import DiffusionAnimation from "../components/formContent/diffusionAnimation";
import InfiniteZoom from "../components/formContent/infiniteZoom";

const VideoGenerator = () => {
  const router = useRouter();
  const { id } = router.query;

  const formContent = useMemo(() => {
    let res = <></>;
    switch (Number(id)) {
      case 1:
        res = <KandinSky model={AiModels[id - 1]} />;
        break;
      case 2:
        res = <Tokenflow model={AiModels[id - 1]} />;
        break;
      case 3:
        res = <Iv2gen model={AiModels[id - 1]} />;
        break;
      case 4:
        res = <Videocrafter model={AiModels[id - 1]} />;
        break;
      case 5:
        res = <Lavie model={AiModels[id - 1]} />;
        break;
      case 6:
        res = <StableDiffusion model={AiModels[id - 1]} />;
        break;
      case 7:
        res = <DiffusionAnimation model={AiModels[id - 1]} />;
        break;
      case 8:
        res = <InfiniteZoom model={AiModels[id - 1]} />;
        break;
      default:
        res = <></>;
        break;
    }
    return res;
  }, [id]);

  return <div className="mt-2 py-5 px-20">{formContent}</div>;
};

export default VideoGenerator;
