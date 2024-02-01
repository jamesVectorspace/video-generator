import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Combobox from "../combobox";
import Counter from "../counter";

export default function StableDiffusion({ model, generateVideo, prediction }) {
  const { default_params } = model;
  const [maxFrames, setMaxFrames] = useState(default_params.max_frames);
  const [animationPrompts, setAnimationPrompts] = useState(
    default_params.animation_prompts
  );
  const [angle, setAngle] = useState(default_params.angle);
  const [translationX, setTranslationX] = useState(
    default_params.translation_x
  );
  const [translationY, setTranslationY] = useState(
    default_params.translation_y
  );

  const [colorCoherence, setColorCoherence] = useState(
    default_params.color_coherence
  );

  const [sampler, setSampler] = useState(default_params.sampler);
  const [seed, setSeed] = useState(default_params.seed);
  const [zoom, setZoom] = useState(default_params.zoom);
  const [fps, setFps] = useState(default_params.fps);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
      fps,
      zoom,
      angle,
      sampler,
      max_frames: maxFrames,
      translation_x: translationX,
      translation_y: translationY,
      color_coherence: colorCoherence,
      animation_prompts: animationPrompts,
      seed,
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
          <InputSlider
            label="max_frames"
            description="Number of frames for animation"
            min={100}
            max={1000}
            step={1}
            dataType="integer"
            value={maxFrames}
            onChange={(e) => {
              setMaxFrames(e.target.value);
            }}
          />

          <Prompt
            label="animation_prompts"
            onChange={(e) => setAnimationPrompts(e.target.value)}
            value={animationPrompts}
            description="Prompt for animation. Provide 'frame number : prompt at this frame', separate different prompts with '|'. Make sure the frame number does not exceed the max_frames."
            defaultValue="0: a beautiful portrait of a woman by Artgerm, trending on Artstation"
          />

          <Prompt
            label="angle"
            onChange={(e) => setAngle(e.target.value)}
            value={angle}
            description="angle parameter for the motion"
            defaultValue="0:(0)"
          />

          <Prompt
            label="zoom"
            onChange={(e) => setZoom(e.target.value)}
            value={zoom}
            description="zoom parameter for the motion"
            defaultValue="0: (1.04)"
          />

          <Prompt
            label="translation_x"
            onChange={(e) => setTranslationX(e.target.value)}
            value={translationX}
            description="translation_x parameter for the motion"
            defaultValue="0: (0)"
          />

          <Prompt
            label="translation_y"
            onChange={(e) => setTranslationY(e.target.value)}
            value={translationY}
            description="translation_y parameter for the motion"
            defaultValue="0: (0)"
          />

          <Combobox
            label="color_coherence"
            description="An enumeration."
            defaultValue={"Match Frame 0 LAB"}
            selected={colorCoherence}
            dataType="string"
            arrayValue={[
              "None",
              "match Frame 0 HSV",
              "Match Frame 0 LAB",
              "Match Frame 0 RGB",
            ]}
            onChange={(e) => setColorCoherence(e.target.selected)}
          />

          <Combobox
            label="sampler"
            description="An enumeration."
            defaultValue={"klms"}
            selected={sampler}
            dataType="string"
            arrayValue={[
              "klms",
              "dpm2",
              "dpm2_ancestral",
              "heun",
              "euler",
              "euler_ancestral",
              "plms",
              "ddim",
            ]}
            onChange={(e) => setSampler(e.target.selected)}
          />

          <InputSlider
            label="fps"
            description="Choose fps for the video."
            min={10}
            max={60}
            step={1}
            defaultValue={15}
            dataType="integer"
            value={fps}
            onChange={(e) => {
              setFps(e.target.value);
            }}
          />

          <SimpleInputNum
            label="seed"
            step={1}
            dataType="integer"
            description="Random seed. Leave blank to randomize the seed"
            defaultValue="0"
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
