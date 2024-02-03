"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'


function PostQuery() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const router = useRouter()




    const handleSubmit=async(event)=> { 
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/postnewquery', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email,query }),
            });
    
            if (!response.ok) {
              throw new Error('failed to  post query  1');
            }
    
            const data = await response.json();
            console.log(data);
            router.push('/dashboard')
            // setDescription(data); // Assuming this is the description you want to display
          } catch (error) {
            console.error('failed to  post query  2', error);
          }
    }

    return (
   
            <div className="my-20">
                <form className="max-w-sm mx-auto ">
                    <div className="mb-5">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Enter Your name
                        </label>
                        <input
                            type="text"
                            placeholder="Full name ..."
                            id="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setFullName(e.target.value.toLowerCase())}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@flowbite.com"
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            required
                        />
                    </div>
                    <div className="pb-10">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Enter your query
                        </label>
                      
                        <textarea
                           
                            id="message"
                            rows={6}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Leave a comment..."
                            onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
   

    )
}
export default PostQuery