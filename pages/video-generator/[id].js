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
  const [curModel, setCurModel] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      setCurModel(AiModels[id - 1]);
    } catch (e) {
      console.log("invalid model", e);
    }
    setLoading(false);
  }, [id]);

  const formContent = useMemo(() => {
    let res = <></>;
    if (!loading) {
      switch (Number(id)) {
        case 1:
          res = <KandinSky model={curModel} />;
          break;
        case 2:
          res = <Tokenflow model={curModel} />;
          break;
        case 3:
          res = <Iv2gen model={curModel} />;
          break;
        case 4:
          res = <Videocrafter model={curModel} />;
          break;
        case 5:
          res = <Lavie model={curModel} />;
          break;
        case 6:
          res = <StableDiffusion model={curModel} />;
          break;
        case 7:
          res = <DiffusionAnimation model={curModel} />;
          break;
        case 8:
          res = <InfiniteZoom model={curModel} />;
          break;
        default:
          break;
      }
    }
    return res;
  }, [id, curModel, loading]);

  return (
    <div className="mt-2 py-5 px-20">{!loading && <>{formContent}</>}</div>
  );
};

export default VideoGenerator;
