import React from "react";

const Combobox = (props) => {
  return (
    <div className="py-2.5" data-type="string" data-name="sample_method">
      <div className="gap-2 flex flex-col">
        <div className="flex items-center">
          <label className="text-r8-base font-mono" for="sample_method">
            <div className="flex items-center gap-1.5" translate="no">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 256 256"
                aria-hidden="true"
              >
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
              {props.label}
            </div>
          </label>
          <span className="ml-1.5 font-sans text-gray-500 dark:text-gray-400">
            {props.dataType}
          </span>
        </div>
        <div className="tw-select">
          <select
            id={props.label}
            className="w-full text-gray-900 border p-2 border-black disabled:cursor-not-allowed disabled:opacity-50"
            name={props.label}
            onChange={props.onChange}
          >
            {props.arrayValue.map((item, idx) => {
              return (
                <option
                  value={item}
                  key={idx}
                  selected={props.selected === item}
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-gray-500 dark:text-gray-400">{props.description}</p>
        <p className="text-gray-500 dark:text-gray-400">
          Default: {props.defaultValue}
        </p>
      </div>
    </div>
  );
};

export default Combobox;
