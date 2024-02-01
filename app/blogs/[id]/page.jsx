"use client"
import { useState, useEffect } from 'react';

export default function Blogs({ params }) {
  const title = decodeURIComponent(params.id);
  const [description, setDescription] = useState('');
  console.log(title)

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch('http://localhost:8080/getblog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        if (!response.ok) {
          throw new Error('Description fetching failed 1');
        }

        const data = await response.json();
        console.log(data);
        setDescription(data);
      } catch (error) {
        console.error('Description fetching failed 2', error);
      }
    };

    fetchDescription();
  }, [title]);

  return (
    <main className="flex flex-col justify-between items-center">
      <div className="relative px-5 py-3">
        <nav className="flex items-center justify-between">
          <ul className="flex">
            <li className="pr-6 text-green-500">Home</li>
            <li className="pr-6 text-green-500">Blogs</li>
            <li className="pr-6 text-green-500">Contact</li>
            <li className="pr-6 text-green-500">About</li>
            <li className="flex items-center">
              <input
                className="p-2 border border-gray-300 rounded mr-2 focus:outline-none"
                type="text"
                placeholder="Search a blog"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                id="btn"
              >
                Search
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-8">
        <p className="font-bold cursor-pointer pb-5">{title}</p>
        <span className="font-light">{description}</span>
      </div>
    </main>
  );
}