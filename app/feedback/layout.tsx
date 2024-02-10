"use client"
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NextTopLoader />
      <ToastContainer />
      {children}
    </>

  );
}
