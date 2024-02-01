import React, { useState } from "react";
import Prompt from "../prompt";
import Combobox from "../combobox";
import SimpleInputNum from "../simpleInputNum";

export default function InfiniteZoom({ model }) {
  const [prompt, setPrompt] = useState("A path going into the woods");
  const [output_format, setOutputFormat] = useState("mp4");
  const [inpaint_inter, setInpaintInter] = useState(2);

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
          <Prompt onChange={(e) => setPrompt(e.target.value)} value={prompt} />
          <Combobox
            label="output_format"
            description="infinite loop gif or mp4 video"
            defaultValue="mp4"
            selected={output_format}
            dataType="string"
            arrayValue={["mp4", "gif"]}
            onChange={(e) => setOutputFormat(e.target.selected)}
          />
          <SimpleInputNum
            label="inpaint_iter"
            step={1}
            dataType="integer"
            description="Number of iterations of pasting the image in it's center and inpainting the boarders"
            defaultValue="2"
            value={inpaint_inter}
            onChange={(e) => setInpaintInter(e.target.value)}
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
