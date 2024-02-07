"use client";
import React from "react";
import Link from "next/link";

const Solve = () => {
  return (
    <>
      <div className="mt-10 ml-20 mr-20">
        <div className=" border-b border-gray-400 mt-3">
          <p className="mb-1 font-semibold cursor-pointer  hover:text-blue-500 hover:underline">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <div className="mb-3">
            <button className="mt-2 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium">
              solve
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Solve;
