import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";
import Combobox from "../combobox";

export default function DiffusionAnimation({ model }) {
  const [width, setWidth] = React.useState(512);
  const [height, setHeight] = React.useState(512);
  const [num_interface_steps, setNumInterfaceSteps] = React.useState(50);
  const [prompt_strength, setPromptStrength] = React.useState(0.9);
  const [prompt_start, setPromptStart] = useState(
    "tall rectangular black monolith, monkeys in the desert looking at a large tall monolith, a detailed matte painting by Wes Anderson, behance, light and space, reimagined by industrial light and magic, matte painting, criterion collection"
  );
  const [prompt_end, setPromptEnd] = useState(
    "tall rectangular black monolith, a white room in the future with a bed, victorian details and a tall black monolith, a detailed matte painting by Wes Anderson, behance, light and space, reimagined by industrial light and magic, matte painting, criterion collection"
  );
  const [maxFrames, setMaxFrames] = useState(16);
  const [numInfeSteps, setNumInfeSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(9);
  const [seed, setSeed] = useState(0);

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
            value={prompt_start}
            description="Prompt to start the animation with"
          />
          <Prompt
            label="prompt_end"
            onChange={(e) => setPromptEnd(e.target.value)}
            value={prompt_end}
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
