"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Solve = () => {
  const [query, setQuery] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchquery() {
      try {
        const response = await fetch("http://localhost:8080/getallquery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to query comments");
        }

        const data = await response.json();
        setQuery(data);
      } catch (error) {
        console.error("Failed to query comments", error);
      }
    }
    fetchquery();
  }, []);

  const handleSolve = async (id) => {
    router.push(`/dashboard/solve/${id}`);
  };

  return (
    <>
      <div className="mt-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="https://cdn.pixabay.com/photo/2024/01/31/19/56/tulips-8544741_1280.jpg"
            alt="<image>"
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order. read more...
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};
export default Solve;

// <div className="flex flex-wrap justify-center mt-20">
//   {query.map((queryItem, index) => (
//     <div
//       key={index}
//       className="max-w-sm m-5 p-10  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//     >
//       <svg
//         className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3 mx-auto"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
//       </svg>
//       <a href="#">
//         <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
//           {queryItem.query}
//         </h5>
//       </a>
//       <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-center">
//         No given description of the query. You can solve the problem or
//         throw the answer as you capable of solving power.
//       </p>
//       <a
//         onClick={() => handleSolve(queryItem.query)}
//         className="cursor-pointer inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Solve
//       </a>
//     </div>
//   ))}
// </div>
