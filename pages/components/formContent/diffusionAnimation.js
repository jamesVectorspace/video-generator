import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Combobox from "../combobox";
import CheckBox from "../checkbox";
import Counter from "../counter";

export default function DiffusionAnimation({
  model,
  generateVideo,
  prediction,
}) {
  const { default_params } = model;

  const [width, setWidth] = React.useState(default_params.width);
  const [height, setHeight] = React.useState(default_params.height);
  const [promptStart, setPromptStart] = useState(default_params.prompt_start);
  const [promptEnd, setPromptEnd] = useState(default_params.prompt_end);
  const [gifpingPong, setGifPingPong] = useState(default_params.gif_ping_pong);
  const [outputFormat, setOutputFormat] = useState(
    default_params.output_format
  );
  const [guidanceScale, setGuidanceScale] = useState(
    default_params.guidance_scale
  );
  const [promptStrength, setPromptStrength] = useState(
    default_params.prompt_strength
  );
  const [filmInterpolation, setFilmInterpolation] = useState(
    default_params.film_interpolation
  );
  const [intermediateOutput, setIntermediateOutput] = useState(
    default_params.intermediate_output
  );
  const [numInferenceSteps, setNumInferenceSteps] = useState(
    default_params.num_inference_steps
  );
  const [numAnimationFrames, setNumAnimationFrames] = useState(
    default_params.num_animation_frames
  );
  const [gifFramesPerSecond, setGifFramesPerSecond] = useState(
    default_params.gif_frames_per_second
  );
  const [numInterpolationSteps, setNumInterpolationSteps] = useState(
    default_params.num_interpolation_steps
  );
  const [seed, setSeed] = useState(default_params.seed);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
      width,
      height,
      prompt_end: promptEnd,
      prompt_start: promptStart,
      output_format: outputFormat,
      guidance_scale: guidanceScale,
      prompt_strength: promptStrength,
      film_interpolation: filmInterpolation,
      intermediate_output: intermediateOutput,
      num_inference_steps: numInferenceSteps,
      num_animation_frames: numAnimationFrames,
      gif_frames_per_second: gifFramesPerSecond,
      num_interpolation_steps: numInterpolationSteps,
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
          <Prompt
            label="prompt_start"
            onChange={(e) => setPromptStart(e.target.value)}
            value={promptStart}
            description="Prompt to start the animation with"
          />
          <Prompt
            label="prompt_end"
            onChange={(e) => setPromptEnd(e.target.value)}
            value={promptEnd}
            description="Prompt to end the animation with. You can include multiple prompts by separating the prompts with | (the 'pipe' character)"
          />
          <Combobox
            label="width"
            description="Width of output image"
            defaultValue={512}
            selected={width}
            dataType="string"
            arrayValue={[128, 256, 512, 768]}
            onChange={(e) => setWidth(e.target.selected)}
          />
          <Combobox
            label="height"
            description="Height of output image"
            defaultValue={512}
            selected={height}
            dataType="string"
            arrayValue={[128, 256, 512, 768]}
            onChange={(e) => setHeight(e.target.selected)}
          />

          <InputSlider
            label="num_inference_steps"
            description="Number of denoising steps"
            min={1}
            max={500}
            step={1}
            dataType="integer"
            value={numInferenceSteps}
            onChange={(e) => {
              setNumInferenceSteps(e.target.value);
            }}
          />

          <SimpleInputNum
            label="prompt_strength"
            step={0.1}
            dataType="number"
            defaultValue="0.8"
            description="Lower prompt strength generates more coherent gifs, higher respects prompts more but can be jumpy"
            value={promptStrength}
            onChange={(e) => setPromptStrength(e.target.value)}
          />

          <InputSlider
            label="num_animation_frames"
            description="Number of frames to animate"
            min={2}
            max={50}
            step={1}
            dataType="integer"
            value={numAnimationFrames}
            onChange={(e) => {
              setNumAnimationFrames(e.target.value);
            }}
          />

          <InputSlider
            label="num_interpolation_steps"
            description="Number of steps to interpolate between animation frames"
            min={1}
            max={50}
            step={1}
            dataType="integer"
            value={numInterpolationSteps}
            onChange={(e) => {
              setNumInterpolationSteps(e.target.value);
            }}
          />

          <InputSlider
            label="guidance_scale"
            description="Scale for classifier-free guidance"
            defaultValue="7.5"
            min={1}
            max={20}
            step={0.1}
            dataType="number"
            value={guidanceScale}
            onChange={(e) => {
              setGuidanceScale(e.target.value);
            }}
          />

          <InputSlider
            label="gif_frames_per_second"
            description="Frames/second in output GIF"
            min={1}
            max={50}
            step={1}
            dataType="integer"
            value={gifFramesPerSecond}
            onChange={(e) => {
              setGifFramesPerSecond(e.target.value);
            }}
          />

          <CheckBox
            label="gif_ping_pong"
            dataType="boolean"
            value={gifpingPong}
            onChange={(e) => setGifPingPong(e.target.checked)}
            description="Whether to reverse the animation and go back to the beginning before looping"
          />

          <CheckBox
            label="film_interpolation"
            dataType="boolean"
            value={filmInterpolation}
            onChange={(e) => setFilmInterpolation(e.target.checked)}
            description="Whether to use FILM for between-frame interpolation (film-net.github.io)"
          />

          <CheckBox
            label="intermediate_output"
            dataType="boolean"
            value={intermediateOutput}
            onChange={(e) => setIntermediateOutput(e.target.checked)}
            description="Whether to display intermediate outputs during generation"
          />

          <SimpleInputNum
            label="seed"
            step={1}
            dataType="integer"
            description="Random seed. Leave blank to randomize the seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />

          <Combobox
            label="output_format"
            description="infinite loop gif or mp4 video"
            defaultValue="mp4"
            selected={outputFormat}
            dataType="string"
            arrayValue={["mp4", "gif"]}
            onChange={(e) => setOutputFormat(e.target.selected)}
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
                                src={prediction.output[0]}
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
