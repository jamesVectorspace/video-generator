import React from "react";

const SimpleInputNum = (props) => {
  return (
    <div className="py-2.5" data-type="integer" data-name="max_frames">
      <div className="gap-2 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <label className="text-r8-base font-mono" htmlFor="max_frames">
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
          {props.min && (
            <span className="text-gray-500 dark:text-gray-400">
              (minimum: {props.min})
            </span>
          )}
        </div>
        <div>
          <div className="flex gap-4">
            <input
              id="max_frames"
              className="border p-2 text-gray-900 border-black w-full flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50 max-w-full min-w-[5rem]"
              dir="auto"
              min="2"
              step={props.step}
              type="number"
              name="max_frames"
              value={props.value}
              onChange={props.onChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-gray-500 dark:text-gray-400">{props.description}</p>
        {props.defaultValue && (
          <p className="text-gray-500 dark:text-gray-400">
            Default: {props.defaultValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleInputNum;
