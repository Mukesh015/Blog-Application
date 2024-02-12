"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import getCookieValueByName from "../../cookie.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Query } from "mongoose";

function PostQuery() {
  const [senderEmail, setSenderEmail] = useState("");
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState(null);
  const router = useRouter();

  async function validation() {
    const token = await getCookieValueByName("cookie-1");
    try {
      const response = await fetch("http://localhost:8080/verifyJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      if (response.status === 200) {
        console.log("User loggedin");
      } else {
        console.log(
          "You are not eligible to access this route ! Please login first"
        );
        router.push("/login");
      }

      const fetchedEmail = await fetch("http://localhost:8080/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const userData = await fetchedEmail.json();

      if (userData && userData.username) {
        const email = userData.username.email;
        setSenderEmail(email);
      } else {
        console.log("failed to fetch Email");
      }
    } catch (error) {
      console.error("Server error autologin failed", error);
    }
  }
  useEffect(() => {
    validation();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/postnewquery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderEmail, query }),
      });

      if (!response.ok) {
        throw new Error("Failed to post query");
      }

      const data = await response.json();
      toast.success("Query posted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to submit query. Please try again", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="ml-72 mt-32 mr-10">
      <form>
        <p className="mb-3 font-semibold font-sans text-yellow-500">
          Include your heading here to suggest additional feeds to help resolve
          issue
        </p>
        <div className="px-4 py-2 bg-white rounded dark:bg-gray-800">
          <input
            id="comment"
            rows="4"
            className="w-full  px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Add your heading here..."
            required
          ></input>
        </div>
        <p className="mb-3 mt-10 font-semibold font-sans text-yellow-500">
          Give a brief explanation of your question so that other users may
          comprehend it.
        </p>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
              <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4"></div>
              <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4"></div>
            </div>
            <button
              type="button"
              data-tooltip-target="tooltip-fullscreen"
              className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5m0 6-5 5"
                />
              </svg>
              <span className="sr-only">Full screen</span>
            </button>
            <div
              id="tooltip-fullscreen"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Show full screen
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <textarea
              id="editor"
              rows="8"
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Describe your query here..."
              value={Query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              required
            ></textarea>
          </div>
        </div>
        <div className="flex items-center space-x-6 mt-7">
          <label className="block">
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files[0])}
              className="mt-3 block w-full text-sm text-slate-500 file:mr-4 mr-44 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Post Query
          </button>
        </div>
      </form>
    </div>
  );
}
export default PostQuery;
