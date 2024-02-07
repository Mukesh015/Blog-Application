"use client";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inbox = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [inboxes, setInboxes] = useState("");
  const token = cookie.get("cookie-1");

  const fetchEmailInboxes = async () => {
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
        setSenderEmail(email);
      } else {
        throw new Error("Failed to fetch user data or username is undefined");
      }
      try {
        const response = await fetch("http://localhost:8080/getInboxes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderEmail }),
        });
        if (!response.ok) {
          toast.error("Failed to inbox messages", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          throw new Error("Failed to fetch Inboxes");
        }
        const data = await response.json();
        setInboxes(data);
      } catch (error) {
        toast.error("Failed to inbox messages", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        console.log("failed to fetch email", error);
      }
    } catch (error) {
      toast.error("Failed to inbox messages", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.log("failed to fetch your inboxes");
    }
  };

  const notify = () => {
    console.log("toast received");
    toast.success("Message submitted successfully!", {
      theme: "dark",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      position: "top-right",
    });
  };

  useEffect(() => {
    fetchEmailInboxes();
  }, [token, senderEmail]);

  return (
    <>
      <ToastContainer />
      <div className="mt-28 ml-80 mr-60">
        {inboxes && inboxes.length > 0 ? (
          inboxes.map((inbox, index) => (
            <div key={index} className="mb-6">
              <p className="font-xl">{inbox.query}</p>
              <div className="mt-10">
                {inbox.description.map((desc, descIndex) => (
                  <div key={descIndex} className="mb-2">
                    <p>{desc}</p>
                    <p className="text-right text-gray-500">
                      Posted by- {inbox.authorName[descIndex]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No Available Query</p>
        )}
        <div>
          <form className="max-w-sm mx-auto my-20">
            <textarea
              id="message"
              style={{
                height: "auto",
                width: "100%",
                minHeight: "40px",
              }}
              className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Reply..."
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                notify();
              }}
              className="relative inline-flex mt-10 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
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
};

export default Inbox;
