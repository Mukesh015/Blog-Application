import React from 'react';


const Dashboard = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg  mt-14">
          <div className="grid grid-cols-2 gap-4 mb-4">

            {/* 1st */}
            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800">
              <p className="text-2xl mx-16 text-gray-400 dark:text-gray-500 text-center">
                <h3 className='font-bold text-white mt-3'>Have Confusion</h3>
                <h6 className='text-sm pt-3'>
                  Have any query. Let us know by posting. You will be notified in the comments box when someone resolves your query. Whole process make few times. So let's get started!
                </h6>
              </p>
              <a
                href="/dashboard/query"  // Replace "/your-link" with the actual URL you want the link to navigate to
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 inline-flex items-center mt-auto mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Make a Query</span>
              </a>
            </div>

            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800">
              <p className="text-2xl mx-16 text-gray-400 dark:text-gray-500 text-center">
                <h3 className='font-bold text-white mt-3'>Solve Query</h3>
                <h6 className='text-sm pt-3'>
                  Solve other queries to helps others. You can get hired my making soluutions if it is correct. Do your best to make your crrier by community.
                </h6>
              </p>
              <a
                href="/dashboard/solve"  // Replace "/your-link" with the actual URL you want the link to navigate to
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 inline-flex items-center mt-auto mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Make a Solution</span>
              </a>
            </div>

            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800">
              <p className="text-2xl mx-16 text-gray-400 dark:text-gray-500 text-center">
                <h3 className='font-bold text-white mt-3'>Solve Query</h3>
                <h6 className='text-sm pt-3'>
                  Solve other queries to helps others. You can get hired my making soluutions if it is correct. Do your best to make your crrier by community.
                </h6>
              </p>
              <a
                href="/your-link"  // Replace "/your-link" with the actual URL you want the link to navigate to
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 inline-flex items-center mt-auto mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Make a Solution</span>
              </a>
            </div>

            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-52 dark:bg-gray-800">
              <p className="text-2xl mx-16 text-gray-400 dark:text-gray-500 text-center">
                <h3 className='font-bold text-white mt-3'>Feedback</h3>
                <h6 className='text-sm pt-3'>
                  Let us know how is your personal experience to browse here. Submit a form by clicking here. Your feedback is valuable for us.
                </h6>
              </p>
              <a
                href="/feedback"  // Replace "/your-link" with the actual URL you want the link to navigate to
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 inline-flex items-center mt-auto mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Feedback</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
