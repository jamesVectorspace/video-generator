import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import SelectType from "../selectType";
import { HandThumbUpIcon } from "@heroicons/react/20/solid";
import SaveImage from "../save-image";
import Counter from "../counter";

const options = [
  "euler_ancestral",
  "klms",
  "dpm2",
  "dpm2_ancestral",
  "heun",
  "euler",
  "plms",
  "ddim",
];

export default function KandinSky({ model, generateVideo, prediction }) {
  const { default_params } = model;
  const [animationPrompts, setAnimationPrompts] = useState(
    default_params.animation_prompts
  );
  const [animations, setAnimations] = useState(default_params.animations);
  const [promptsDurations, setPromptsDuration] = useState(
    default_params.prompt_durations
  );
  const [seed, setSeed] = useState(default_params.seed);
  const [fps, setFps] = useState(default_params.fps);
  const [maxFrames, setMaxFrames] = useState(default_params.max_frames);
  const [videoHeight, setVideoHeight] = useState(default_params.height);
  const [videoWidth, setVideoWidth] = useState(default_params.width);
  const [steps, setSteps] = useState(default_params.steps);
  const [scheduler, setScheduler] = useState(default_params.scheduler);

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = {
      animation_prompts: animationPrompts,
      animations,
      prompt_durations: promptsDurations,
      seed,
      fps,
      max_frames: maxFrames,
      height: videoHeight,
      width: videoWidth,
      steps,
      scheduler,
    };
    generateVideo(prompt);
  };

  const resetHandler = () => {
    setSeed(default_params.seed);
    setSteps(default_params.steps);
    setVideoWidth(default_params.videoWidth);
    setVideoHeight(default_params.videoHeight);
    setMaxFrames(default_params.maxFrames);
    setFps(default_params.fps);
    setAnimationPrompts(default_params.animation_prompts);
    setAnimations(default_params.animations);
    setPromptsDuration(default_params.prompt_durations);
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
              "Prompt/s to generate animation from. If using multiple prompts, separate different prompts with '|'."
            }
            onChange={(e) => setAnimationPrompts(e.target.value)}
            value={animationPrompts}
          />

          <Prompt
            label={"animations"}
            description={
              "Animation action/s, available options are [right, left, up, down, spin_clockwise, spin_counterclockwise, zoomin, zoomout, rotate_right, rotate_left, rotate_up, rotate_down, around_right, around_left, zoomin_sinus_x, zoomout_sinus_y, right_sinus_y, left_sinus_y, flipping_phi, live]. Enter one action per animation prompt and separate actions with '|'."
            }
            onChange={(e) => setAnimations(e.target.value)}
            value={animations}
          />

          <Prompt
            label={"prompt_durations"}
            description={
              "Duration (seconds) to generate each animation prompt for, enter float or int values separated by '|'. Each prompt will have an equal duration if no value is provided."
            }
            onChange={(e) => setPromptsDuration(e.target.value)}
            value={promptsDurations}
          />

          <InputSlider
            label="fps"
            description="Frame per Second / FPS of the output video"
            min={10}
            max={60}
            step={1}
            dataType="integer"
            value={fps}
            onChange={(e) => {
              setFps(e.target.value);
            }}
          />

          <InputSlider
            label="max_frames"
            description="Number of frames for animation"
            min={10}
            max={1000}
            step={1}
            dataType="integer"
            value={maxFrames}
            onChange={(e) => {
              setMaxFrames(e.target.value);
            }}
          />

          <InputSlider
            label="height"
            description="Video height"
            min={256}
            max={1024}
            step={1}
            dataType="integer"
            value={videoHeight}
            onChange={(e) => {
              setVideoHeight(e.target.value);
            }}
          />

          <InputSlider
            label="width"
            description="Video width"
            min={256}
            max={1024}
            step={1}
            dataType="integer"
            value={videoWidth}
            onChange={(e) => {
              setVideoWidth(e.target.value);
            }}
          />

          <SelectType
            label="scheduler"
            description="Schedular for the diffusion process"
            dataType="string"
            value={scheduler}
            defaultValue={"euler_ancestral"}
            options={options}
            onChange={(e) => {
              setScheduler(e.target.value);
            }}
          />

          <InputSlider
            label="steps"
            description="Number of diffusion denoising steps"
            min={10}
            max={250}
            step={1}
            dataType="integer"
            value={steps}
            onChange={(e) => {
              setSteps(e.target.value);
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
                onClick={resetHandler}
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
                        <SaveImage
                          open={open}
                          setOpen={setOpen}
                          prediction={prediction}
                          url={prediction.output}
                        />
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
