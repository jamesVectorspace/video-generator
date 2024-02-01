import React from "react";

const CheckBox = (props) => {
  return (
    <div className="py-2.5" data-type="boolean" data-name="interpolation">
      <div className="gap-2 flex items-center">
        <input
          id="interpolation"
          type="checkbox"
          className="disabled:cursor-not-allowed disabled:opacity-50"
          name="interpolation"
          value={props.interpolation}
        />
        <div className="flex items-center">
          <label className="text-r8-base font-mono" for="interpolation">
            <div className="flex items-center gap-1.5" translate="no">
              {props.label}
            </div>
          </label>
          <span className="ml-1.5 font-sans text-gray-500 dark:text-gray-400">
            {props.dataType}
          </span>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-gray-500 dark:text-gray-400">{props.description}</p>
      </div>
    </div>
  );
};

export default CheckBox;
