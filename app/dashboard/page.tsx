"use client"
import React from 'react';
import getCookieValueByName from "../cookie.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { freemem } from 'os';




const Dashboard = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');

  const [totalNoQuery, setTotalNoQuery] = useState('');
  const [totalNoPosts, setTotalNoPosts] = useState('');
  const [totalNoComments, setTotalComments] = useState('');



  const router = useRouter();

  async function validation() {
  const token = await getCookieValueByName("cookie-1");
    
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/verifyjwt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });
  
    if (response.status === 200) {
      console.log('User logged in');
    } else {
      console.log('You are not eligible to access this route! Please login first');
      router.push("/login");
    }
  
    const response1 = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  
    if (!response1.ok) {
      console.log("Internal server error");
    } else {
      const userData = await response1.json();
      const email = userData.username.email;
      setSenderEmail(email);
      setAuthorEmail(email)
  
      const numberOfQuery = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/counttotalquery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderEmail: email }), // Use the email retrieved from the user data
      });
  
      if (!numberOfQuery.ok) {
        console.log("Internal server error");
      } else {
        const numquery = await numberOfQuery.json();
        const query = await numquery;
        setTotalNoQuery(query);
      }
      const numberOfPosts = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/counttotalposts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Use the email retrieved from the user data
      });
  
      if (!numberOfPosts.ok) {
        console.log("Internal server error");
      } else {
        const numPosts = await numberOfPosts.json();
        const posts = await numPosts;
        setTotalNoPosts(posts);
      }

      const numberOfComments = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/counttotalcomments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({authorEmail: email}), // Use the email retrieved from the user data
      });
  
      if (!numberOfComments.ok) {
        console.log("Internal server error");
      } else {
        const numComments = await numberOfComments.json();
        const comments = await numComments;
        setTotalComments(comments);
      }
    }
    
    
    
  } catch (error) {
    console.error("Server error autologin failed", error);
  }
  
  }

  useEffect(() => {
    validation();

  }, );


  return (
    <>
      <div className="flex flex-wrap ml-64 mt-16">
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/* Metric Card */}
          <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-green-600">
                  <i className="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">Total Queries</h2>
                <p className="font-bold text-3xl text-black">{totalNoQuery} <span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
              </div>
            </div>
          </div>
          {/* /Metric Card */}
        </div>
       
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/* Metric Card */}
          <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-yellow-600">
                  <i className="fas fa-user-plus fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">Comments</h2>
                <p className="font-bold text-3xl text-black">{totalNoComments}<span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
              </div>
            </div>
          </div>
          {/* /Metric Card */}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/* Metric Card */}
          <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-blue-600">
                  <i className="fas fa-server fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">Total Posts</h2>
                <p className="font-bold text-3xl text-black">{totalNoPosts}</p>
              </div>
            </div>
          </div>
          {/* /Metric Card */}
        </div>
        
      
      </div>


      {/* cards ------------------------------------------------------------------------------------------------ */}


      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">

            {/* 1st */}
            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800 p-6">
              <h3 className="font-bold text-white text-2xl mt-3">Have Confusion?</h3>
              <p className="text-center text-gray-400 dark:text-gray-500 mt-3">
                Have any queries? Let us know by posting. You will be notified in the comments box when someone resolves your query. The whole process may take some time, so lets get started!
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