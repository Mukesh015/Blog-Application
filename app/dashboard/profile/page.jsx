import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <div className="flex dashboard h-screen font-serif bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: "url('https://img.freepik.com/free-photo/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products_1258-52609.jpg')"}}>
        <div className="sidebar bg-gray-800 text-white max-w-[230px] p-8">
          <li className="font-bold text-2xl pb-16 pl-0 bg-clip-text text-transparent" style={{backgroundImage: "url('https://e0.pxfuel.com/wallpapers/977/713/desktop-wallpaper-flame-high-resolution-n7zb.jpg')"}}>
            DASHBOARD
          </li>
          <ul className="list-none">
            <li className="pb-8">
              <Link href='/'>Home</Link>
            </li>
            <li className="pb-8">
              <Link href='/dashboard/profile'>Profile</Link>
            </li>
            <li className="pb-8">
              <Link href='/dashboard/inbox'>Inbox</Link>
            </li>
            <li className="pb-8">
              <Link href='/dashboard/posts'>Posts</Link>
            </li>
            <li className="pb-8">
              <Link href='/dashboard/comments'>Comments</Link>
            </li>
            <li className="pb-8">
              <Link href='/dashboard/settings'>Settings</Link>
            </li>
            <li id="btn" className="pt-36">Logout</li>
          </ul>
        </div>
        <div className="cardsContainer flex">
          <div className="question_card bg-white rounded-lg p-8 max-w-[280px] text-center h-96 ml-8 mt-40 box-border shadow-md">
            <h2 className="pb-4 text-lg font-bold text-gray-800">Ask Question</h2>
            <p className="pb-4 text-gray-600">You can find out your solution corresponding to your query when it will be solved by someone.</p>
            <a href="#" className="inline-block mt-4 px-8 py-2 bg-blue-500 text-white rounded">Post Query</a>
          </div>
          <div className="question_card bg-white rounded-lg p-8 max-w-[280px] text-center h-96 ml-8 mt-40 box-border shadow-md">
            <h2 className="pb-4 text-lg font-bold text-gray-800">Ask Question</h2>
            <p className="pb-4 text-gray-600">You can find out your solution corresponding to your query when it will be solved by someone.</p>
            <a href="#" className="inline-block mt-4 px-8 py-2 bg-blue-500 text-white rounded">Post Query</a>
          </div>
          <div className="question_card bg-white rounded-lg p-8 max-w-[280px] text-center h-96 ml-8 mt-40 box-border shadow-md">
            <h2 className="pb-4 text-lg font-bold text-gray-800">Ask Question</h2>
            <p className="pb-4 text-gray-600">You can find out your solution corresponding to your query when it will be solved by someone.</p>
            <a href="#" className="inline-block mt-4 px-8 py-2 bg-blue-500 text-white rounded">Post Query</a>
          </div>
          <div className="question_card bg-white rounded-lg p-8 max-w-[280px] text-center h-96 ml-8 mt-40 box-border shadow-md">
            <h2 className="pb-4 text-lg font-bold text-gray-800">Ask Question</h2>
            <p className="pb-4 text-gray-600">You can find out your solution corresponding to your query when it will be solved by someone.</p>
            <a href="#" className="inline-block mt-4 px-8 py-2 bg-blue-500 text-white rounded">Post Query</a>
          </div>
        </div>
      </div>
    </>
  );
}
