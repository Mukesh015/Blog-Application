"use client"
import { useState, useEffect } from "react";
import cookie from 'js-cookie';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const token = cookie.get('cookie-1');
  const router = useRouter();

  async function validation() {
    try {
        const response = await fetch("http://localhost:8080/verifyJWT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        });
        if (response.status === 200) {
            console.log('User loggedin');
        } else {
            console.log('You are not eligible to access this route ! Please login first');
            router.push("/login");
        }
    } catch (error) {
        console.error("Server error autologin failed", error);
    }
}

  useEffect(() => {
    validation();
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
  }, [token,senderEmail]); // Empty dependency array to run the effect only once on mount

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
