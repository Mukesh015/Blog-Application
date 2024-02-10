"use client";
import React from "react";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

const Solve = () => {
  const token = cookie.get("cookie-1");
  const [query, setQuery] = useState([]);
  const [senderEmail, setSenderEmail] = useState("");
  const router = useRouter();

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

      if (userData && userData.username) {
        const email = await userData.username.email;
        setSenderEmail(email);
        const response = await fetch("http://localhost:8080/getsolvequery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderEmail:email }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to query ");
        }
  
        const data = await response.json();
        setQuery(data);
      }
     else {
        throw new Error("Failed to fetch user data or username is undefined");
      }
    }
         catch (error) {
        console.log("failed to fetch Solve query", error);
      }

  };


  useEffect(() => {
    fetchEmail();
  
  }, [token,senderEmail]);


  async function handleSolve(id) {
    router.push(`/dashboard/solve/${id}`);
  }

  return (
    <>
      <div className="mt-28 ml-80 mr-20">
        {query.map((query, index) => (
          <div key={index} className=" border-b border-gray-400 mt-3">
            <p
              className="mb-1 font-semibold"
            >
              {query.query}
            </p>

            <div className="mb-3">
              <button
                type="button"
                onClick={() => handleSolve(query.query)}
                className="mt-2 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium"
              >
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
        ))}
      </div>
    </>
  );
};

export default Solve;