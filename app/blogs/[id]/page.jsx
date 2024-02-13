"use client";
import Error404 from "../../error404.jsx";
import { useState, useEffect } from "react";
import cookie from "js-cookie";

export default function Blogs({ params }) {
  const query = decodeURIComponent(params.id);

  const [serviceError, setserviceError] = useState(false);
  const [notFoundError, setnotFoundError] = useState(false);
  const [description, setDescription] = useState("");
  const [blogData, setBlogData] = useState({ description: [], authorName: [] });
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorName, setAuthorName] = useState("");

  const token = cookie.get("cookie-1");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch("http://localhost:8080/getblog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          setnotFoundError(true);
          throw new Error("Description fetching failed 1");
        }

        const data = await response.json();

        setBlogData(data);
      } catch (error) {
        setserviceError(true);
        console.error("Description fetching failed", error);
      }
    };

    fetchDescription();
  }, [query]);

  const combinedArray = blogData.description.map((description, idx) => ({
    description,
    authorName: blogData.authorName[idx],
  }));

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

  const handleAddComment = async () => {
    try {
      const response = await fetch("http://localhost:8080/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, authorEmail, authorName, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  console.log(authorName, authorEmail);

  if (serviceError) {
    return <Error404 />;
  } else if (notFoundError) {
    return <Error404 />;
  }

  return (
    <>
      <div className="mt-28 ml-80 mr-60">
        <div>
          <span className="font-bold text-blue-500 text-2xl">{query}</span>
        </div>
        <div className="mt-7">
          <div>
            {combinedArray && combinedArray.length > 0 ? (
              combinedArray.map((paragraph, index) => (
                <p key={index}>
                  <h1>{paragraph.description}</h1>
                  <div style={{ textAlign: "right" }}>
                    <p className="text-yellow-500">
                      Posted by - {paragraph.authorName}
                    </p>
                  </div>
                </p>
              ))
            ) : (
              <p>No data Available</p>
            )}
          </div>
        </div>
        <div>
          <form className="max-w-sm mx-auto my-20">
            <label
              htmlFor="message"
              className="block mb-2 mt-7 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Your Opinion
            </label>
            <textarea
              id="message"
              rows="auto"
              style={{
                height: "auto",
                width: "100%",
                minHeight: "120px",
              }}
              className="block p-3.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="relative inline-flex mt-10 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              onClick={() => handleAddComment()}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
