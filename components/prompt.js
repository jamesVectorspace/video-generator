import React, { useMemo } from "react";

const Prompt = (props) => {
  const height = useMemo(() => {
    return props.value.toString().split(/\r*\n/).length * 42;
  }, [props.value]);

  return (
    <div className="py-2.5">
      <div className="gap-2 flex flex-col">
        <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <label className="text-r8-base font-mono">
              <div className="flex items-center gap-1.5" translate="no">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <path d="M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z"></path>
                </svg>
                {props.label}
              </div>
            </label>
            <span className="text-r8-red-10">*</span>
            <span className="ml-1.5 font-sans text-gray-500 dark:text-gray-400">
              string
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400 transition-all opacity-100 translate-y-0">
            <span translate="no">
              <kbd className="text-gray-500 dark:text-gray-400 border py-px px-1">
                Shift
              </kbd>{" "}
              +{" "}
              <kbd className="text-gray-500 dark:text-gray-400 border py-px px-1">
                Return
              </kbd>
            </span>{" "}
            to add a new line
          </span>
        </div>
        <textarea
          id="prompt"
          dir="auto"
          required={true}
          className={`border p-2 border-black w-full text-gray-900 resize-none disabled:cursor-not-allowed disabled:opacity-50`}
          name="prompt"
          value={props.value}
          style={{ height: `${height}px !important` }}
          onChange={props.onChange}
        />
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-gray-500 dark:text-gray-400">{props.description}</p>
      </div>
    </div>
  );
};

export default Prompt;
