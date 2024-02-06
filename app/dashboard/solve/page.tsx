"use client"
import React from 'react';
import getCookieValueByName from "../../cookie.js";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Solve = () => {
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
        console.log('User loggedin');
      } else {
        console.log('You are not eligible to access this route ! Please login first');
        router.push("/login");
      }
    } catch (error) {
      console.error("Server error autologin failed", error);
    }
  }
  useEffect(() => {
    validation();
  }, []);

  return (
    <>
      <form className="max-w-sm mx-auto my-20">
        <div>
          <label
            htmlFor="small-input"
            className="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Email
          </label>
          <input
            type="text"
            placeholder="example@gmail.com"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <label
          className="block mb-2 mt-7 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Solution
        </label>
        <textarea
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <button className="relative inline-flex mt-10 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Submit
          </span>
        </button>
      </form>
    </>
  );
}
export default Solve;