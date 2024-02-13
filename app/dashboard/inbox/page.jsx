"use client";
import { useState, useEffect,useCallback } from "react";
import cookie from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const Inbox = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [inboxes, setInboxes] = useState("");
  const token = cookie.get("cookie-1");

  const fetchEmailInboxes = useCallback( async () => {
    try {
      const fetchedEmail = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getuser`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getInboxes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderEmail }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Inboxes");
        }
        const data = await response.json();
        setInboxes(data);
      } catch (error) {
        console.log("failed to fetch email", error);
      }
    } catch (error) {
      console.log("failed to fetch your inboxes");
    }
  },[token,senderEmail]);

  useEffect(() => {
    fetchEmailInboxes();
  }, [fetchEmailInboxes]);

  return (
    <>
      <div className="mt-28 ml-80 mr-28">
        {inboxes && inboxes.length > 0 ? (
          inboxes.map((inbox, index) => (
            <div key={index} className="mb-5 border-b-2 border-white pb-6">
              <p className="text-blue-500 font-bold text-xl">{inbox.query}</p>
              <div className="mt-4">
                {inbox.description.map((desc, descIndex) => (
                  <div key={descIndex} className="mb-2 text-gray-400">
                    <p>{desc}</p>
                    <p className="text-right text-yellow-300 ml-4">
                      commented by- {inbox.authorName[descIndex]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No Available Query</p>
        )}
      </div>
    </>
  );
};

export default Inbox;
