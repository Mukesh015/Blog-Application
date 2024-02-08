"use client";
import React from "react";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const Solve = ({ params }) => {
  const query = decodeURIComponent(params.id);
  const [description, setDescription] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorName, setAuthorName] = useState("");
  const token = cookie.get("cookie-1");

  const [fullscreenTooltipVisible, setFullscreenTooltipVisible] =
    useState(false);

  const toggleFullscreenTooltip = () => {
    setFullscreenTooltipVisible(!fullscreenTooltipVisible);
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const fetchedEmail = await fetch("http://localhost:8080/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const userData = await fetchedEmail.json();

        // Check if userData and userData.username are defined
        if (userData && userData.username) {
          const email = userData.username.email;
          const name = userData.username.username;
          setAuthorName(name);
          setAuthorEmail(email);
        } else {
          throw new Error("Failed to fetch user data or username is undefined");
        }
      } catch (error) {
        ("failed to fetch email");
      }
    };
    fetchEmail();
  }, [token]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, authorEmail, authorName, description }),
      });

      if (!response.ok) {
        toast.error("post published",{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        throw new Error("Failed to fetch comments");
      } else {
        const data = await response.json();
        console.log(data);
        setComments(data);
        toast.success("post published",{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <>
      <div className="ml-80 mt-28 mr-10">
        <h1 className="mb-10">{query}</h1>
        <div>
          <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={toggleFullscreenTooltip}
                      className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 19 19"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                        />
                      </svg>
                      <span className="sr-only">Full screen</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <label htmlFor="editor" className="sr-only">
                  Publish post
                </label>
                <textarea
                  id="editor"
                  rows="8"
                  className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write an article..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              onClick={() => handleSubmit()}
            >
              Publish post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Solve;