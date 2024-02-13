"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Popular() {
  const [popularBlog, setPopularBlog] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularBlog = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getpopularblog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Blog fetching failed 1");
        }

        const data = await response.json();

        setPopularBlog(data);
      } catch (error) {
        console.error("Blog fetching failed 2", error);
      }
    };
    fetchPopularBlog();
  }, []);

  const handleReadMore = async (id) => {
    router.push(`/blogs/${id}`);
  };

  const truncateDescription = (description) => {
    const sentences = description.split(/[.!?]/);
    const truncatedSentences = sentences.slice(0, 3);
    return truncatedSentences.join(". ") + ".";
  };

  return (
    <div className="mt-24 ml-40 mr-40">
      {popularBlog.map((item, index) => (
        <div className="border-b border-gray-400 mt-3" key={index}>
          <div>
            <p className="mb-4 font-semibold cursor-default text-yellow-500 hover:text-lime-700">
              {item.query}
            </p>
            {item.description.length > 0 ? (
              <span className="text-gray-400 block font-normal">
                {truncateDescription(item.description[0])}
              </span>
            ) : (
              <span className="text-gray-400 block font-normal">
                No description Available
              </span>
            )}

            <div className="mb-3">
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium"
                onClick={() => handleReadMore(item.query)}
              >
                Read more...
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
        </div>
      ))}
    </div>
  );
}
