"use client";
import { useState, useEffect } from "react";

export default function Blogs({ params }) {
  const title = decodeURIComponent(params.id);
  const [description, setDescription] = useState("");
  console.log(title);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch("http://localhost:8080/getblog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });

        if (!response.ok) {
          throw new Error("Description fetching failed 1");
        }

        const data = await response.json();
        console.log(data);
        setDescription(data);
      } catch (error) {
        console.error("Description fetching failed 2", error);
      }
    };

    fetchDescription();
  }, [title]);

  return (
    <>
      
    </>
  );
}
