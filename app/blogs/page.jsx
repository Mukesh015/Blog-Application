"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Error503 from "../error503.jsx";

export default function Blogs() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQueryDescription = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getallblog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setError(true);
          throw new Error("Description fetching failed");
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        setError(true);
        console.error("Description fetching failed", error);
      }
    };

    fetchQueryDescription();
  }, []);

  const handleReadMore = async (id) => {
    router.push(`/blogs/${id}`);
  };

  if (error) {
    return <Error503 />;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20">
      <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        {result.map((entry, index) => (
          <a
            key={index}
            className="group rounded-xl overflow-hidden dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <div className="sm:flex">
              <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                <img
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover rounded-xl"
                  src={entry.queryPic ? entry.queryPic : "https://cdn.pixabay.com/photo/2017/05/30/03/58/blog-2355684_1280.jpg"} 
                  alt="Image Description"
                />
              </div>
              <div className="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white">
                  {entry.query}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {entry.description.length > 0 && typeof entry.description[0] === "string"
                    ? entry.description[0]
                        .split(/[.!?]+/)
                        .slice(0, 2)
                        .join(". ")
                    : "No description available"}
                </p>
                <button
                  className="mt-4 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium"
                  onClick={() => handleReadMore(entry.query)}
                >
                  Read more
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="https://www.svgrepo.com/show/10382/blogger.svg"
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
          </a>
        ))}
      </div>
    </div>
  );
}
