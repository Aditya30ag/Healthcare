import React from "react";

function HealthCareBanner() {
  return (
    <div
      className="relative w-full mt-28 h-[32vh] bg-center bg-cover"
      style={{ backgroundImage: "url('../assets/3.png')" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70">
        <div className="px-4 text-center md:px-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
            Healthcare for Good
            <br />
            Today. Tomorrow. Always.
          </h1>
        </div>

        <div className="w-full max-w-md mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Doctors, Specialities and Hospitals"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute transform -translate-y-1/2 right-3 top-2/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      
      </div>
      
    </div>
   
  );
}

export default HealthCareBanner;
