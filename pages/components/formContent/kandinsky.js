import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";

export default function KandinSky({ model }) {
  console.log("model", model);
  const { default_params } = model;
  const [animationPrompts, setAnimationPrompts] = useState(
    default_params.animation_prompts
  );
  const [animations, setAnimations] = useState(default_params.animations);
  const [promptsDurations, setPromptsDuration] = useState(
    default_params.prompt_durations
  );
  const [maxFrames, setMaxFrames] = useState(16);
  const [numInfeSteps, setNumInfeSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(9);
  const [seed, setSeed] = useState(0);
  const [fps, setFps] = useState(0);

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function uploadFile(file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const fileRes = btoa(reader.result);
      setPreview(`data:image/jpg;base64,${fileRes}`);
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  }

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const [file] = e.target.files || e.dataTransfer.files;
    uploadFile(file);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(preview, prompt, maxFrames, numInfeSteps, guidanceScale, seed);
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
            label={"animation_prompts"}
            description={
              "Prompt/s to generate animation from. If using multiple prompts, separate different prompts with " |
              "."
            }
            onChange={(e) => setAnimationPrompts(e.target.value)}
            value={animationPrompts}
          />

          <Prompt
            label={"animation_prompts"}
            description={
              "Prompt/s to generate animation from. If using multiple prompts, separate different prompts with " |
              "."
            }
            onChange={(e) => setAnimations(e.target.value)}
            value={animations}
          />

          <Prompt
            label={"animation_prompts"}
            description={
              "Prompt/s to generate animation from. If using multiple prompts, separate different prompts with " |
              "."
            }
            onChange={(e) => setPromptsDuration(e.target.value)}
            value={promptsDurations}
          />

          <SimpleInputNum
            label="fps"
            step={1}
            dataType="integer"
            description="Frame per Second / FPS of the output video"
            defaultValue="24"
            value={fps}
            onChange={(e) => setFps(e.target.value)}
            min={2}
          />

          <SimpleInputNum
            label="max_frames"
            step={1}
            dataType="integer"
            description="Number of frames in the output"
            defaultValue="16"
            value={maxFrames}
            onChange={(e) => setMaxFrames(e.target.value)}
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
            value={numInfeSteps}
            onChange={(e) => {
              setNumInfeSteps(e.target.value);
            }}
          />
          <InputSlider
            label="guidance_scale"
            description="Scale for classifier-free guidance"
            min={1}
            max={20}
            step={0.01}
            defaultValue={9}
            dataType="number"
            value={guidanceScale}
            onChange={(e) => {
              setGuidanceScale(e.target.value);
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
                src={model.url}
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
