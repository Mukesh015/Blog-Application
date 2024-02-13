"use client";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = cookie.get("cookie-1");
  const router = useRouter();

  useEffect(() => {
    const fetchEmailPosts = async () => {
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
          setSenderEmail(email);
        } else {
          throw new Error("Failed to fetch user data or username is undefined");
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getposts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderEmail }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }

          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts", error);
        }
      } catch (error) {
        console.error("Failed to fetch email", error);
      }
    };
    fetchEmailPosts();
  }, [token, senderEmail]);

  const handlePostLink = async (id) => {
    router.push(`/blogs/${id}`);
  };

  const handleDeleteButtonClick = async (query) => {
    setSelectedPost(query);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/deletequery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: selectedPost }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete query");
      } else {
        toast.success("post deleted successfully", {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }
    } catch (error) {
      console.log("Delete opration failed, server", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const PostItem = ({ post }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="mb-4 mt-10">
        <div className="flex justify-between items-center">
          <p
            className="font-semibold cursor-pointer hover:text-blue-500"
            onClick={() => handlePostLink(post.query)}
          >
            {post.query}
          </p>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="inline-flex p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-2"
                style={{ maxWidth: "10rem" }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="hover:bg-green-500 block px-4 py-2 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => handleDeleteButtonClick(post.query)}
                      className="block px-4 py-2 hover:bg-red-500 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <span className="border-b border-gray-400 block mt-2"></span>
      </div>
    );
  };

  return (
    <div className="mt-20 ml-80 mr-20">
      {posts && posts.length > 0 ? (
        posts.map((post, index) => <PostItem key={index} post={post} />)
      ) : (
        <p>No Available posts from this account</p>
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <div
          id="deleteModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center"
        >
          {/* Delete modal content */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="flex justify-center items-center min-h-screen">
              <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-xl sm:p-6">
                <button
                  onClick={handleCloseDeleteModal}
                  type="button"
                  className="absolute top-0 right-0 p-2 m-2 text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="text-center">
                  <svg
                    className="text-gray-400 w-12 h-12 mx-auto"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Are you sure?
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you really want to delete this item? This action cannot
                      be undone.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleConfirmDelete}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={handleCloseDeleteModal}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
