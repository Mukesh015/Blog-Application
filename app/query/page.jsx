"use client";
import React from "react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";



const Solve = () => {
  const [query, setQuery] = useState([])
  const router = useRouter();

  useEffect(() => {
    async function fetchquery(){
  try {
    const response = await fetch('http://localhost:8080/getallquery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });

    if (!response.ok) {
      throw new Error('Failed to query comments');
    }

    const data = await response.json();
    setQuery(data);
  } catch (error) {
    console.error('Failed to query comments', error);
  } 
    }
    fetchquery()
  })


  const handleSolve=async(id)=>{
    router.push(`/dashboard/solve/${id}`);

  }
  return (
    <>
      <div className="mt-10 ml-20 mr-20">
      {query.map((query, index) => (
        <div className=" border-b border-gray-400 mt-3">
        
          <p key={index} className="mb-1 font-semibold">
            {query.query}
          </p>
        
          <div className="mb-3">
            <button type='button' className="mt-2 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium" 
            onClick={() => handleSolve(query.query)}>
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