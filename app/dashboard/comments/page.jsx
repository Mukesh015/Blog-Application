"use client";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorEmail, setAuthorEmail] = useState("");
  const token = cookie.get("cookie-1");
  const router = useRouter();

  const validation = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/verifyJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      if (response.status === 200) {
        console.log("User loggedin");
      } else {
        console.log(
          "You are not eligible to access this route ! Please login first"
        );
        router.push("/login");
      }
    } catch (error) {
      console.error("Server error autologin failed", error);
    }
  }, [token, router]);

  const fetchEmail = useCallback(async () => {
    try {
      const fetchedEmail = await fetch("http://localhost:8080/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const userData = await fetchedEmail.json();
      const email = userData.username.email;
      setAuthorEmail(email);
    } catch (error) {
      console.log("failed to fetch Email", error);
    }
  }, [token]);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/getcomments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authorEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  }, [authorEmail]);
  useEffect(() => {
    validation();
    fetchEmail();
    fetchComments();
  }, [validation, fetchEmail, fetchComments]);

  return (
    <div className="mr-16 ml-80 mt-20">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <li key={index}>
              <span className=" absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
              <h2 className="pb-7 pl-6  cursor-pointer text-yellow-400 hover:text-blue-500">
                {item.query[0].query}
              </h2>
              <ul>
                {item.descriptions.map((description, idx) => (
                  <li className="mb-8 ms-6" key={idx}>
                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                      <time className="mb-1 text-xs font-normal text-lime-500 sm:order-last sm:mb-0">
                        {description.timestamp}
                      </time>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                        {description.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <h1 className="font-extrabold text-center">No comments posted</h1>
        )}
      </ol>
    </div>
  );
};

export default Comment;
