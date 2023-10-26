import React from "react";
import { BiX } from "react-icons/bi";

const Tag = ({ name, onBtnXClick, showX }) => {
  return (
    <div>
      <div className="relative inline-block py-1 text-sm">
        <div className="absolute inset-0 flex text-blue-200">
          <svg height="100%" viewBox="0 0 50 100">
            <path
              d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex-grow h-full -ml-px bg-blue-200 rounded-md rounded-l-none" />
        </div>
        <span className="relative flex items-center pr-px font-semibold text-blue-500 uppercase">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {name}
          <span>&nbsp;</span>
          {showX && (
            <BiX
              onClick={() => {
                onBtnXClick(name);
              }}
              size={20}
              className="text-red-500 cursor-pointer"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default Tag;
