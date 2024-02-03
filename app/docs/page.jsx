import React from "react";
import Image from "next/image";

const QuickStartGuide = () => {
  return (
    <>
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BLOG COMMUNITY
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            <div className="relative hidden md:block overflow-hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="relative flex justify-center mt-20 mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12">
        <label
          htmlFor="navigation"
          className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-12 h-12 mb-4 ml-4 border rounded-full shadow-lg cursor-pointer text-slate-600 border-slate-300 lg:hidden transition duration-200 ease-in-out active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8h16M4 16h16"
            />
          </svg>
        </label>
        <input
          type="checkbox"
          name="navigation"
          id="navigation"
          className="hidden peer"
        />
        <div className="fixed top-[3.5rem] h-screen shadow-xl px-4 left-0 hidden peer-checked:block lg:relative lg:top-0 lg:h-auto lg:px-0 lg:block lg:flex-none lg:shadow-none ">
          <nav className="sticky top-[4.5rem] w-64 pr-8 text-base lg:text-sm xl:w-72 xl:pr-16">
            <ul
              role="list"
              className="-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-7 pl-0.5 space-y-8"
            >
              <li>
                <h3 className="font-semibold tracking-tight text-white ">
                  Getting started
                </h3>

                <ul role="list" className="pl-3 mt-3 space-y-2 ">
                  <li>
                    <a href="#" className="text-gray-400">
                      Quick start guide
                    </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-400">
                      How does Spinal work?
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <h3 className="font-semibold tracking-tight text-white">
                  Content Types
                </h3>

                <ul role="list" className="pl-3 mt-3 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400">
                      What are content types?
                    </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-400">
                      Create and edit content types
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <h3 className="font-semibold tracking-tight text-white">
                  Content
                </h3>

                <ul role="list" className="pl-3 mt-3 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400">
                      What kind of content can I create and edit?
                    </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-400">
                      Previewing content
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-auto max-w-2xl min-w-0 px-4 py-10 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article className="">
            <header className="">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Quick start guide
              </h1>
            </header>

            <p className="mt-2 text-xl text-slate-600">
              Need to get started quickly with Spinal? You will learn all the
              basics in just minutes.
            </p>

            <a
              href="#"
              className="flex flex-col w-full mt-4 overflow-hidden rounded-lg shadow-xl md:flex-row md:w-4/5"
            >
              <div className="flex items-center justify-center w-full px-4 py-16 text-sm font-normal md:w-1/3 text-slate-900/20 bg-gradient-to-br from-indigo-200 via-sky-100 to-indigo-100">
                [Screenshot Image]
              </div>

              <div className="w-full px-6 py-4 border-t border-b border-r md:w-2/3 border-slate-200">
                <h3 className="text-xl font-semibold tracking-tight text-gray-500">
                  Video walkthrough
                </h3>

                <p className="mt-1 text-lg text-slate-600">
                  Watch this 5 minutes video-walkthrough of Spinal. You quickly
                  learn how to set up your dashboard, invite team members, set
                  permissions and how to schedule and publish content.
                </p>
              </div>
            </a>

            <h3 className="mt-16 text-base font-bold tracking-tight text-white">
              Get set up quickly
            </h3>

            <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <li>
                <a
                  href="#"
                  className="block px-6 py-4 border rounded bg-slate-50 border-slate-100 hover:bg-white"
                >
                  <h4 className="font-bold tracking-tight text-slate-900">
                    Connect your GitHub account
                  </h4>

                  <p className="text-slate-600">
                    What you need to know before connecting your GitHub account
                  </p>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block px-6 py-4 border rounded bg-slate-50 border-slate-100 hover:bg-white"
                >
                  <h4 className="font-bold tracking-tight text-slate-900">
                    Add your first content type
                  </h4>

                  <p className="text-slate-600">
                    Learn what content types are in Spinal
                  </p>
                </a>
              </li>

              <li className="">
                <a
                  href="#"
                  className="block px-6 py-4 border rounded bg-slate-50 border-slate-100 hover:bg-white"
                >
                  <h4 className="font-bold tracking-tight text-slate-900">
                    Invite your first team member
                  </h4>

                  <p className="text-slate-600">
                    You write your best marketing content with your team
                  </p>
                </a>
              </li>

              <li className="">
                <a
                  href="#"
                  className="block px-6 py-4 border rounded bg-slate-50 border-slate-100 hover:bg-white"
                >
                  <h4 className="font-bold tracking-tight text-slate-900">
                    Publish your content
                  </h4>

                  <p className="text-slate-600">
                    Publishing with Spinal is really just one click of a button
                  </p>
                </a>
              </li>
            </ul>

            <h3 className="mt-8 text-base font-bold tracking-tight text-white">
              Have questions?
            </h3>

            <p className="text-white">
              Still have questions?{" "}
              <a
                href="mailto:support@spinalcms.com"
                className="underline hover:no-underline"
              >
                Talk to support
              </a>
              .
            </p>
          </article>

          <dl className="flex pt-6 mt-6 border-t border-slate-200">
            <div className="ml-auto text-right">
              <dt className="text-sm font-normal tracking-tight text-white">
                Next
              </dt>

              <dd className="mt-1">
                <a
                  href="#"
                  className="text-base font-semibold text-white hover:underline"
                >
                  How does Spinal work?
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </main>
      </div>
    </>
  );
};

export default QuickStartGuide;
