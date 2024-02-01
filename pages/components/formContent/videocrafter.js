import React, { useState } from "react";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Counter from "../counter";

export default function Videocrafter({ model, generateVideo, prediction }) {
  const { default_params } = model;
  const [prompt, setPrompt] = useState(default_params.prompt);
  const [saveFps, setSaveFps] = useState(default_params.save_fps);
  const [ddimSteps, setDdimSteps] = useState(default_params.ddim_steps);
  const [guidanceScale, setGuidanceScale] = useState(9);
  const [seed, setSeed] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
      prompt,
      save_fps: saveFps,
      ddim_steps: ddimSteps,
      unconditional_guidance_scale: guidanceScale,
    };
    generateVideo(parameters);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="input-col relative md:flex-1 pb-4 min-w-0">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="!my-0 text-r8-2xl">Input</h2>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Prompt onChange={(e) => setPrompt(e.target.value)} value={prompt} />
          <SimpleInputNum
            label="ddim_steps"
            step={1}
            dataType="integer"
            description="Number of frames in the output"
            defaultValue="16"
            value={ddimSteps}
            onChange={(e) => setDdimSteps(e.target.value)}
            min={2}
          />
          <SimpleInputNum
            label="unconditional_guidance_scale"
            step={1}
            dataType="integer"
            description="Classifier-free guidance scale."
            value={guidanceScale}
            onChange={(e) => setGuidanceScale(e.target.value)}
          />
          <SimpleInputNum
            label="seed"
            step={1}
            dataType="integer"
            description="Random seed. Leave blank to randomize the seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
          <SimpleInputNum
            label="save_fps"
            step={1}
            dataType="integer"
            description="Frame per second for the generated video."
            value={seed}
            onChange={(e) => setSaveFps(e.target.value)}
          />
          <div className="sticky bottom-0">
            <div className="flex items-center justify-end gap-2 py-4 border-t bg-black border-r8-gray-6">
              <button
                type="button"
                className="px-4 py-2 border dark:border-white dark:text-white"
              >
                <span>Reset</span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 border bg-white text-gray-900"
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
              <>
                {prediction && (
                  <>
                    {prediction.status == "succeeded" && (
                      <>
                        <div className="relative">
                          <button
                            onClick={() => setOpen(true)}
                            className="image-wrapper rounded-lg hover:opacity-75"
                          >
                            <video
                              className={`rounded-xl aspect-square w-auto h-auto`}
                              controls
                            >
                              <source
                                src={prediction.output}
                                type="video/mp4"
                              ></source>
                            </video>
                          </button>
                        </div>
                        {/* <SaveImage
                          open={open}
                          setOpen={setOpen}
                          prediction={prediction}
                          url={prediction.output}
                        /> */}
                      </>
                    )}

                    {!prediction.output && prediction.error && (
                      <div className="border border-gray-300 py-3 text-sm opacity-50 flex items-center justify-center aspect-square rounded-lg">
                        <span className="mx-12">{prediction.error}</span>
                      </div>
                    )}

                    {!prediction.output && !prediction.error && (
                      <div className="border border-gray-300 py-3 text-sm opacity-50 flex items-center justify-center aspect-square rounded-lg">
                        <Counter />
                      </div>
                    )}
                  </>
                )}
                {!prediction && (
                  <video
                    src={model.url}
                    preload="auto"
                    autoPlay
                    controls
                    loop
                    style={{ width: "auto", height: "auto" }}
                  />
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
