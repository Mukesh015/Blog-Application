"use client"
import React from 'react';
import getCookieValueByName from "../cookie.js";
import { useRouter } from "next/navigation";
import { useEffect,useState } from 'react';


const Dashboard = () => {
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
      } else{
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
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg  mt-14">
          <div className="grid grid-cols-2 gap-4 mb-4">

            {/* 1st */}
            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-white text-2xl mt-3">Have Confusion?</h3>
              <p className="text-center text-gray-400 dark:text-gray-500 mt-3">
                Have any queries? Let us know by posting. You will be notified in the comments box when someone resolves your query. The whole process may take some time, so let's get started!
              </p>
              <a
                href="/dashboard/query"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 inline-flex items-center mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Make a Query</span>
              </a>
            </div>


            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-white text-2xl mt-3">Solve Query</h3>
              <p className="text-center text-gray-400 dark:text-gray-500 mt-3">
                Solve other queries to helps others. You can get hired my making soluutions if it is correct. Do your best to make your crrier by community.
              </p>
              <a
                href="/dashboard/solve"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 inline-flex items-center mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Solve Query</span>
              </a>
            </div>
            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-white text-2xl mt-3">Not Designed !</h3>
              <p className="text-center text-gray-400 dark:text-gray-500 mt-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto accusamus labore dicta ab natus iste fugit voluptatem doloribus vero.
              </p>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 inline-flex items-center mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Make a Query</span>
              </a>
            </div>
            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-white text-2xl mt-3">Feedback</h3>
              <p className="text-center text-gray-400 dark:text-gray-500 mt-3">
                Let us know how is your personal experience to browse here. Submit a form by clicking here. Your feedback is valuable for us.
              </p>
              <a
                href="/feedback"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 inline-flex items-center mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Feedback</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
