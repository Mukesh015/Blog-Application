"use client";

import React, { useEffect, useState, Fragment, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";


const Solve = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [query, setQuery] = useState([]);
  const router = useRouter();

  const handlePopup = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function fetchquery() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/getallquery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to query comments");
        }

        const data = await response.json();
        setQuery(data);
      } catch (error) {
        console.error("Failed to query comments", error);
      }
    }
    fetchquery();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-wrap mt-20 gap-4">
          {query.map((entry, index) => (
            <div
              key={index}
              className="mt-10 ml-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href={`/dashboard/solve/${entry.query}`}>
                <img
                  className="rounded-t-lg"
                  src={
                    entry.queryPic
                      ? entry.queryPic
                      : "https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg"
                  }
                  alt="https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg"
                />
              </a>
              <div className="p-5">
                <div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white cursor-default">
                    {entry.query}
                  </h3>
                  <p class="mb-3 flex-row font-normal cursor-text text-gray-700 dark:text-gray-400">
                    {entry.queryDescription
                      ? entry.queryDescription
                          .split(".")
                          .slice(0, 2)
                          .join(".") + "..."
                      : "This query has no description provided, you can figure it out on your own... "}
                    <button onClick={handlePopup} class="text-blue-500">
                      read more
                    </button>
                  </p>
                </div>
                <a
                  href={`/dashboard/solve/${entry.query}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  solve
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-2xl border border-gray-500 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl bg-black">
                    <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4  bg-black text-gray-500 max-h-96  overflow-y-auto">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Reprehenderit officiis eveniet non dolorem sed
                        repellat blanditiis, architecto dolores voluptate
                        molestiae nemo enim reiciendis facere animi cupiditate
                        esse id doloribus maiores inventore aspernatur possimus
                        aut culpa. Officia quasi provident magni nesciunt
                        accusantium. Hic distinctio mollitia commodi fugit, quis
                        repellendus? Hic dolor itaque ipsa reprehenderit labore
                        deleniti esse corporis animi similique voluptatem
                        obcaecati cum, fugiat commodi natus molestiae vero rerum
                        aliquid consequuntur debitis quibusdam ipsum nihil qui a
                        quisquam. Praesentium, ipsum placeat consectetur maiores
                        voluptates est, voluptatibus quasi magni distinctio nam
                        ea? Iste tenetur atque error, dolore repellendus quod
                        nesciunt exercitationem animi.
                      </p>
                    </div>

                    <div className="bg-black px-4 py-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-1 bg-white inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};
export default Solve;
