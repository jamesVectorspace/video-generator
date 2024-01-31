import { useState } from "react";
import { useRouter } from "next/router";

export default function VideoGenerator({}) {
  const router = useRouter();

  const model = JSON.parse(router.query.model);
  console.log("model", model);

  const [animationPrompts, setAnimationPrompts] = useState();
  const [promptDurations, setPromptDurations] = useState();
  const [animations, setAnimations] = useState();
  const [fps, setFps] = useState(24);
  const [maxFrames, setMaxFrames] = useState(72);
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(640);
  const [steps, setSteps] = useState(80);
  const [seeds, setSeeds] = useState(-1);

  const onKeyDown = (e) => {
    if (e.metaKey && e.which === 13) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {};

  return (
    <div className="px-4 lg:px-0 flex justify-center flex-col items-center">
      <div className="flex max-w-[1024px] w-full py-6 justify-between">
        <div className="flex flex-col md:flex-row w-1/2">
          <div className="pt-0 relative md:flex-1 pb-4 min-w-0">
            <div
              id=":rq:"
              role="tabpanel"
              aria-labelledby="form"
              className="py-4"
              tabindex="0"
            >
              <form
                onKeyDown={onKeyDown}
                className="w-full"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="space-y-4">
                  <div className="relative mb-6">
                    <span className="text-white">fps integer</span>
                    <input
                      id="labels-range-input"
                      type="range"
                      min="10"
                      max="60"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      value={fps}
                      onChange={(e) => setFps(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <span className="text-white">max_frames integer</span>
                    <input
                      id="labels-range-input"
                      type="range"
                      min="10"
                      max="1000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      value={maxFrames}
                      onChange={(e) => setMaxFrames(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <span className="text-white">height integer</span>
                    <input
                      id="labels-range-input"
                      type="range"
                      min="256"
                      max="1024"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <span className="text-white">width integer</span>
                    <input
                      id="labels-range-input"
                      type="range"
                      min="256"
                      max="1024"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <span className="text-white">steps integer</span>
                    <input
                      id="labels-range-input"
                      type="range"
                      min="10"
                      max="250"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <span className="text-white">seed integer</span>
                    <input
                      type="text"
                      id="large-input"
                      className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={-1}
                      value={seeds}
                      onChange={(e) => setSeeds(e.target.value)}
                    />
                  </div>

                  <div className="relative mb-6">
                    <span className="text-white">animation_prompts</span>
                    <dd className="text-r8-sm">
                      <textarea
                        id="animation_prompts"
                        required=""
                        className="output p-2 whitespace-pre-wrap bg-r8-gray-3 text-black md:text-base font-mono overflow-y-auto max-h-96"
                        name="animation_prompts"
                        value={animationPrompts}
                        onChange={(e) => setAnimationPrompts(e.target.value)}
                        placeholder="Enter a animation prompts"
                      />
                    </dd>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <dt className="text-r8-sm text-r8-gray-11">animations</dt>
                    <dd className="text-r8-sm">
                      <textarea
                        id="animations"
                        required=""
                        className="output p-2 whitespace-pre-wrap bg-r8-gray-3 text-black md:text-base font-mono overflow-y-auto max-h-96"
                        name="animations"
                        value={animations}
                        onChange={(e) => setAnimations(e.target.value)}
                        placeholder="live | right | right | right | live"
                      />
                    </dd>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <dt className="text-r8-sm text-r8-gray-11">
                      prompt_durations
                    </dt>
                    <dd className="text-r8-sm">
                      <textarea
                        dir="auto"
                        required=""
                        className="output p-2 whitespace-pre-wrap bg-r8-gray-3 text-r8-gray-12 font-mono text-r8-sm overflow-y-auto max-h-96"
                        name="value-prompt_durations-string"
                        value={promptDurations}
                        onChange={(e) => setPromptDurations(e.target.value)}
                        placeholder="0.6 | 0.3 | 1 | 0.3 | 0.8"
                      />
                    </dd>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="output-col md:flex-1 pb-4 min-w-0 w-1/2">
          <div className="flex flex-col ">
            <video
              autoPlay
              loop
              controls={false}
              src={model.url}
              className="rounded-lg hover:md:scale-105 transition lg:h-80 lg:w-80 object-cover w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
