import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NextTopLoader from 'nextjs-toploader';


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <NextTopLoader />
      {children}
      <ToastContainer />
    </>

  );
}
