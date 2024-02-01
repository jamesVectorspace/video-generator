import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Combobox from "../combobox";
import CheckBox from "../checkbox";
import Counter from "../counter";

export default function Lavie({ model, generateVideo, prediction }) {
  const { default_params } = model;
  const [prompt, setPrompt] = useState(default_params.prompt);
  const [width, setWidth] = useState(default_params.width);
  const [height, setHeight] = useState(default_params.height);
  const [numInfeSteps, setNumInfeSteps] = useState(
    default_params.num_inference_steps
  );
  const [guidanceScale, setGuidanceScale] = useState(
    default_params.guidance_scale
  );
  const [quality, setQuality] = useState(default_params.quality);
  const [seed, setSeed] = useState(default_params.seed);
  const [interpolation, setInterpolation] = useState(
    default_params.interpolation
  );
  const [resolution, setResolution] = useState(default_params.resolution);
  const [fps, setFps] = useState(default_params.video_fps);
  const [sampleMethod, setSmapleMethod] = useState(
    default_params.sample_method
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
      width,
      height,
      prompt,
      quality,
      video_fps: fps,
      interpolation,
      sample_method: sampleMethod,
      guidance_scale: guidanceScale,
      super_resolution: resolution,
      num_inference_steps: numInfeSteps,
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
          <Prompt
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            description="Prompt for video generation."
          />
          <Combobox
            label="sample_method"
            description="Choose a scheduler for sampling base video output."
            defaultValue="ddpm"
            selected={sampleMethod}
            dataType="string"
            arrayValue={["ddim", "eulerdiscrete", "ddpm"]}
            onChange={(e) => setSmapleMethod(e.target.selected)}
          />
          <SimpleInputNum
            label="width"
            step={1}
            dataType="integer"
            description="Width of output video."
            defaultValue="512"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <SimpleInputNum
            label="height"
            step={1}
            dataType="integer"
            description="Height of output video"
            defaultValue="320"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <SimpleInputNum
            label="num_inference_steps"
            step={1}
            dataType="integer"
            description="Number of denoising steps"
            value={numInfeSteps}
            defaultValue="50"
            onChange={(e) => setNumInfeSteps(e.target.value)}
          />
          <SimpleInputNum
            label="num_inference_steps"
            step={0.01}
            dataType="integer"
            description="Scale for classifier-free guidance"
            value={guidanceScale}
            defaultValue="7"
            onChange={(e) => setGuidanceScale(e.target.value)}
          />
          <InputSlider
            label="quality"
            description="Quality of the output vide0"
            step={1}
            defaultValue={9}
            dataType="integer"
            value={quality}
            onChange={(e) => {
              setQuality(e.target.value);
            }}
          />
          <SimpleInputNum
            label="seed"
            step={1}
            dataType="integer"
            description="Random seed. Leave blank to randomize the seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
          <CheckBox
            label="interpolation"
            dataType="boolean"
            value={interpolation}
            onChange={(e) => setInterpolation(e.target.checked)}
            description="Default output has 16 frames. Set interpolation to True to get 61 frames output."
          />
          <CheckBox
            label="super_resolution"
            dataType="boolean"
            value={resolution}
            onChange={(e) => setResolution(e.target.checked)}
            description="Super resolution 4x when set to True."
          />
          <SimpleInputNum
            label="video_fps"
            step={1}
            dataType="integer"
            defaultValue="8"
            description="Number of frames per second in the output video"
            value={fps}
            onChange={(e) => setFps(e.target.value)}
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
