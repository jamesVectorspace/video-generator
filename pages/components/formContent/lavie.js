import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Combobox from "../combobox";
import CheckBox from "../checkbox";

export default function Lavie({ model }) {
  const [prompt, setPrompt] = useState(
    "a Corgi walking in the park at sunrise, oil painting style"
  );
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(320);
  const [numInfeSteps, setNumInfeSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(7);
  const [quality, setQuality] = useState(9);
  const [seed, setSeed] = useState(0);
  const [interpolation, setInterpolation] = useState(false);
  const [resolution, setResolution] = useState(false);
  const [fps, setFps] = useState(8);
  const [sample_method, setSmapleMethod] = useState("ddpm");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);
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
            selected={sample_method}
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
              <video
                src={model?.url}
                preload="auto"
                autoPlay
                controls
                loop
                style={{ width: "auto", height: "auto" }}
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
