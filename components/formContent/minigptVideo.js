import React, { useState } from "react";
import Prompt from "../prompt";
import { supabaseClient, supabaseClientUrl } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import Counter from "../counter";

export default function MinigptVideo({ model, generateVideo, prediction }) {
  const { default_params } = model;

  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [question, setQuestion] = useState(default_params.question);

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const [file] = e.target.files || e.dataTransfer.files;
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function isImageOnSupabase(videoUrl) {
    if (typeof videoUrl != "string") {
      return false;
    } else {
      return videoUrl.startsWith(supabaseClientUrl);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newVideoUrl;
    if (videoFile) {
      if (!isImageOnSupabase(videoUrl)) {
        const videoName = `${uuidv4()}-${videoFile.name}`;
        console.log("videoName", videoName);

        // upload controlnet image
        const { data, error } = await supabaseClient.storage
          .from("images")
          .upload(`public/${videoName}`, videoFile);

        if (data) {
          console.log(
            `successfully uploaded ${JSON.stringify(data)}, ${videoFile.name}`
          );
        } else {
          console.log(
            `failed uploaded ${JSON.stringify(error)}, ${videoFile.name}`
          );
          window.alert("Failed to upload image");
          return;
        }

        newVideoUrl = `${supabaseClientUrl}/storage/v1/object/public/images/public/${videoName}`;
        setVideoUrl(newVideoUrl);
      } else {
        newVideoUrl = videoUrl;
      }
    }

    const parameters = {
      video: newVideoUrl,
      question: question,
      add_subtitles: false,
    };

    generateVideo(parameters, newVideoUrl);
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
          {videoUrl && (
            <video src={videoUrl} preload="auto" className="max-w-full" />
          )}
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
                      Video
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
                    accept="video/*"
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
          <Prompt
            label="question"
            description="Default: What's this video talking about?"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
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
