import React, { useState } from "react";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Counter from "../counter";

export default function Cinematic({ model, generateImage, prediction }) {
  const { default_params } = model;
  const [prompt, setPrompt] = useState(default_params.prompt);
  const [negativePrompt, setNegativePrompt] = useState(
    default_params.negative_prompt
  );
  const [width, setWidth] = useState(default_params.width);
  const [height, setHeight] = useState(default_params.height);
  const [numImages, setNumImages] = useState(default_params.num_images);
  const [numInfeSteps, setNumInfeSteps] = useState(
    default_params.num_inference_steps
  );
  const [guidanceScale, setGuidanceScale] = useState(
    default_params.guidance_scale
  );
  const [seed, setSeed] = useState(default_params.seed);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
      prompt,
      negative_prompt: negativePrompt,
      width,
      height,
      num_images: numImages,
      num_inference_steps: numInfeSteps,
      guidance_scale: guidanceScale,
      seed,
    };
    generateImage(parameters);
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
            description="Default: Astronaut in a jungle, cold color palette, muted colors, detailed, 8k"
          />

          <Prompt
            onChange={(e) => setNegativePrompt(e.target.value)}
            value={prompt}
            description="Default: text, watermark, blur, deformed, noised"
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
            label="num_images"
            step={1}
            min={1}
            max={8}
            dataType="integer"
            description="Number of images per prompt"
            value={numImages}
            defaultValue="1"
            onChange={(e) => setNumImages(e.target.value)}
          />
          <SimpleInputNum
            label="num_inference_steps"
            step={1}
            min={1}
            max={100}
            dataType="integer"
            description="Scale for classifier-free guidance"
            value={numInfeSteps}
            defaultValue="30"
            onChange={(e) => setNumInfeSteps(e.target.value)}
          />
          <SimpleInputNum
            label="guidance_scale"
            step={1}
            min={1}
            max={20}
            dataType="integer"
            description="Scale for classifier-free guidance"
            value={guidanceScale}
            defaultValue="6"
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
                            {/* <video
                              className={`rounded-xl aspect-square w-auto h-auto`}
                              controls
                            >
                              <source
                                src={prediction.output}
                                type="video/mp4"
                              ></source>
                            </video> */}
                            {prediction.output && (
                              <img
                                className={`rounded-xl aspect-square max-w-full object-cover`}
                                loading="lazy"
                                src={
                                  prediction.output[
                                    prediction.output.length - 1
                                  ]
                                }
                                alt="output"
                              />
                            )}
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
                  <img
                    src={model.url}
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
