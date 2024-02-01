import React, { useState } from "react";

import InputSlider from "../inputSlider";
import Prompt from "../prompt";
import SimpleInputNum from "../simpleInputNum";

export default function Iv2gen({ model }) {
  const [preview, setPreview] = React.useState("");
  const [prompt, setPrompt] = useState("A blonde girl in jeans");
  const [maxFrames, setMaxFrames] = useState(16);
  const [numInfeSteps, setNumInfeSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(9);
  const [seed, setSeed] = useState(0);

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
          {preview && <img src={preview} alt="image" className="max-w-full" />}
          <div className="py-2.5" data-type="string" data-name="image">
            <div className="flex flex-col gap-2 group" data-disabled="true">
              <div className="flex items-center">
                <div className="flex items-center">
                  <label className="text-r8-base font-mono" htmlFor="image">
                    <div className="flex items-center gap-1.5" translate="no">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        aria-hidden="true"
                      >
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                      </svg>
                      image
                    </div>
                  </label>
                  <span className="text-r8-red-10">*</span>
                  <span className="ml-1.5 font-sans text-r8-sm text-r8-gray-10">
                    file
                  </span>
                </div>
              </div>
              <div
                className="flex flex-col gap-2"
                onDragEnter={(e) => handleEnter(e)}
                onDragLeave={(e) => handleLeave(e)}
                onDragOver={(e) => handleOver(e)}
                onDrop={(e) => handleUpload(e)}
              >
                <div
                  role="presentation"
                  className="bg-r8-gray-2 p-4 border border-r8-gray-7 border-dashed hover:border-r8-gray-9 cursor-pointer group-data-[disabled=true]:hover:border-r8-gray-7"
                >
                  <input
                    type="file"
                    tabIndex="-1"
                    accept="image/*"
                    id="image"
                    style={{ display: "none" }}
                    onChange={(e) => handleUpload(e)}
                  />
                  <p className="text-r8-sm text-r8-gray-11 flex items-center gap-2 select-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      aria-hidden="true"
                    >
                      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-40-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z"></path>
                    </svg>
                    Drop a file or click to upload
                  </p>
                </div>
                <button
                  disabled=""
                  type="button"
                  className="p-4 w-full h-full bg-r8-gray-2 border border-r8-gray-7 hover:border-r8-gray-9 disabled:hover:border-r8-gray-7 disabled:cursor-not-allowed"
                >
                  <p className="text-r8-sm text-r8-gray-10 select-none flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      aria-hidden="true"
                    >
                      <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
                    </svg>
                    Take a photo with your webcam
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-r8-sm text-r8-gray-12">Input image.</p>
            </div>
            <div className="mt-2 flex items-center text-r8-red-10 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
              </svg>
              <p className="text-r8-sm">This field is required</p>
            </div>
          </div>
          <Prompt onChange={(e) => setPrompt(e.target.value)} value={prompt} />
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
