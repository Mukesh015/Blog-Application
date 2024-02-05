"use client"

const Comment = () => {
  return (
    <>
      <div className="mr-16 ml-80 mt-20">
        <ol className="relative border-s border-gray-200 dark:border-gray-700 ">
          <h2 className="pb-10 pl-6 cursor-pointer text-yellow-400 hover:text-blue-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci,
            quasi itaque. Itaque sunt nesciunt hic labore magni repudiandae
            saepe nostrum eum sint rem, esse, blanditiis doloribus, a odio ab
            deserunt quod pariatur enim error nulla molestiae. Obcaecati eveniet
            voluptatibus exercitationem laborum doloremque vel in ducimus, non
            minus velit quia beatae?
          </h2>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                just now
              </time>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                Bonnie moved{" fucking idiot "}
              </div>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                just now
              </time>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                HI Friends{" fucking idiot "}
              </div>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                just now
              </time>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                Hellow{""}
              </div>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}

export default Comment;