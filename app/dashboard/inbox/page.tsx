"use client"
import React from 'react';
import getCookieValueByName from "../../cookie.js";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inbox = () => {

    const router = useRouter();
    const toastAnimation = () => {
        toast.success("Reply sent!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    async function validation() {
        const token = await getCookieValueByName("cookie-1");
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
    }, []);

    return (
        <>
            <div className="mt-28 ml-80 mr-60">
                <div>
                    <p className="font-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                        voluptatibus.
                    </p>
                </div>
                <div className="mt-10">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi saepe
                        reiciendis ex ratione ad nostrum, veritatis hic deleniti voluptates?
                        Illum, laboriosam? Adipisci blanditiis consectetur aliquam modi
                        minima, facere excepturi. Quo nesciunt iusto explicabo! Numquam
                        veritatis, autem tenetur deleniti unde nisi modi temporibus
                        dignissimos, perspiciatis distinctio, hic nobis saepe eum? Dolore
                        aperiam voluptate quos maxime quis ad praesentium voluptatibus saepe
                        incidunt illo eveniet accusantium quod sunt, eius expedita. Dolorum
                        labore, ad, atque hic inventore earum veniam sapiente molestiae quod
                        dolore ducimus provident eius, nostrum sit consequuntur praesentium
                        porro? Eos illo sed eligendi alias dolorem! Totam obcaecati sapiente
                        porro sit molestiae, nostrum, quibusdam reiciendis molestias natus
                        iusto qui, cum at. Enim ut, cupiditate magni, commodi laborum ab
                    </p>
                </div>
                <div>
                    <form className="max-w-sm mx-auto my-20">
                        <textarea
                            id="message"
                            style={{
                                height: "auto",
                                width: "100%",
                                minHeight: "40px",
                            }}
                            className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Reply..."
                        ></textarea>
                        <button onClick={toastAnimation} className="relative inline-flex mt-10 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Submit
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Inbox;