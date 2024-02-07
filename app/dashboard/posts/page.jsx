"use client"
import { useState, useEffect } from "react";
import cookie from 'js-cookie';
import dynamic from "next/dynamic";

const Post = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const token = cookie.get('cookie-1');

  useEffect(() => {
    const fetchEmailPosts = async () => {
      try {
        const fetchedEmail = await fetch('http://localhost:8080/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const userData = await fetchedEmail.json();

        if (userData && userData.username) {
          const email = userData.username.email;
          setSenderEmail(email);
        } else {
          throw new Error('Failed to fetch user data or username is undefined');
        }
        
        try {
          const response = await fetch('http://localhost:8080/getposts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senderEmail }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }

          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Failed to fetch posts', error);
        }
      } catch (error) {
        console.error('Failed to fetch email', error);
      }
    };
    fetchEmailPosts();
  }, [token,senderEmail]);

  return (
    <>
      <div className="mt-20 ml-80 mr-20">
        {posts && posts.length > 0 ? (
          posts.map((paragraph, index) => (
            <div key={index} className="mb-4 font-semibold cursor-pointer hover:text-blue-500 mt-10">
              <p>{paragraph.query}</p>
              <span className="border-b border-gray-400 block mt-2"></span> {/* Border after each post */}
            </div>
          ))
        ) : (
          <p>No Available posts from this account</p>
        )}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Post), { ssr: false });