import React, { useEffect } from "react";
import { useRouter } from "next/router";
import InputSlider from "../components/inputSlider";
import Prompt from "../components/prompt";
import SimpleInputNum from "../components/simpleInputNum";

const VideoGenerator = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, [id]);

  return (
    <div className="mt-2 p-5">
      <div className="flex flex-col md:flex-row">
        <div className="input-col relative md:flex-1 pb-4 min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="!my-0 text-r8-2xl">Input</h2>
            </div>
          </div>
          <form id="input-form">
            <a
              className="inline-flex flex-col"
              href="https://replicate.delivery/pbxt/KA6KcZp2UhselAqryBuWaIV2w3KPKYJpVM9cQtqSctlhwdK5/img_0002.png"
            >
              <img
                src="https://replicate.delivery/pbxt/KA6KcZp2UhselAqryBuWaIV2w3KPKYJpVM9cQtqSctlhwdK5/img_0002.png"
                alt="image"
                className="max-w-full"
              />
            </a>
            <Prompt />
            <SimpleInputNum
              label="max_frames"
              step={1}
              dataType="integer"
              description="Number of frames in the output"
              defaultValue="16"
              min={2}
            />
            <InputSlider
              label="num_inference_steps"
              description="Number of denoising steps"
              min={1}
              max={500}
              step={1}
              defaultValue={50}
              dataType="integer"
            />
            <InputSlider
              label="guidance_scale"
              description="Scale for classifier-free guidance"
              min={1}
              max={20}
              step={0.01}
              defaultValue={9}
              dataType="number"
            />
            <SimpleInputNum
              label="seed"
              step={1}
              dataType="integer"
              description="Random seed. Leave blank to randomize the seed"
            />
            <div className="sticky bottom-0">
              <div className="flex items-center justify-end gap-2 py-4 border-t bg-black border-r8-gray-6">
                <button
                  aria-disabled="true"
                  type="button"
                  disabled=""
                  className="px-4 py-2 border dark:border-white dark:text-white"
                  style={{ pointerEvents: "none" }}
                >
                  <span>Reset</span>
                </button>
                <button
                  aria-disabled="true"
                  type="submit"
                  form="input-form"
                  className="px-4 py-2 border bg-white text-gray-900"
                  style={{ pointerEvents: "none" }}
                >
                  <span>Run</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="input-output-grid--divider flex-shrink-0 md:mx-6 mb-6 md:my-0"
          role="separator"
        >
          <div className="bg-white md:w-px md:h-full h-px w-full"></div>
        </div>
        <div className="output-col md:flex-1 pb-4 min-w-0">
          <div className="flex flex-col">
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h2 className="!my-0 text-r8-2xl">Output</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full" style={{ width: "auto", height: "auto" }}>
                <video
                  src="https://replicate.delivery/pbxt/8FpYFhLD6XKYIpivyRjI3LHHhV4C1kAVsGZSP4f2f4Uk6NJSA/out.mp4"
                  preload="auto"
                  autoplay
                  controls
                  loop
                  style={{ width: "auto", height: "auto" }}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
