import React, { useState } from "react";

const InputSlider = (props) => {
  return (
    <div className="py-2.5">
      <div className="gap-2 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <label className="text-white-base font-mono">
              <div className="flex items-center gap-1.5" translate="no">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <path d="M224,88H175.4l8.47-46.57a8,8,0,0,0-15.74-2.86l-9,49.43H111.4l8.47-46.57a8,8,0,0,0-15.74-2.86L95.14,88H48a8,8,0,0,0,0,16H92.23L83.5,152H32a8,8,0,0,0,0,16H80.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,80,224a8,8,0,0,0,7.86-6.57l9-49.43H144.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,144,224a8,8,0,0,0,7.86-6.57l9-49.43H208a8,8,0,0,0,0-16H163.77l8.73-48H224a8,8,0,0,0,0-16Zm-76.5,64H99.77l8.73-48h47.73Z"></path>
                </svg>
                {props.label}
              </div>
            </label>
            <span className="ml-1.5 font-sans text-gray-500 dark:text-gray-400">
              {props.dataType}
            </span>
          </div>

          <span className="text-gray-500 dark:text-gray-400">
            (minimum: {props.min}, maximum: {props.max})
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <input
          id="num_inference_steps"
          className="border p-2 text-gray-900 border-black w-full flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50 max-w-[5.5rem]"
          dir="auto"
          max={props.max}
          min={props.min}
          step="1"
          type="number"
          name="num_inference_steps"
          value={props.value}
          onChange={props.onChange}
        />
        <div className="md:min-w-[16rem] w-full flex items-center">
          <label
            className="sr-only"
            htmlFor="num_inference_steps-range"
            translate="no"
          >
            {props.label}
          </label>
          <input
            id="num_inference_steps-range"
            className="w-full disabled:cursor-not-allowed disabled:opacity-50"
            max={props.max}
            min={props.min}
            step={props.step}
            type="range"
            name="num_inference_steps"
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-gray-500 dark:text-gray-200">{props.description}</p>
        <p className="text-gray-500 dark:text-gray-400">
          Default: {props.defaultValue}
        </p>
      </div>
    </div>
  );
};

export default InputSlider;
