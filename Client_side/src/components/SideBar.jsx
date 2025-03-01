import React from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  
  // Get current date in DD-MM-YYYY format
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
  
  // Enhanced logout function to remove all patient-related data
  const handleLogout = () => {
    // Remove all authentication and patient tokens
    localStorage.removeItem("token");
    localStorage.removeItem("patientId");
    localStorage.removeItem("patientToken");
    
    // Redirect to login page
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen p-4 text-white w-72 lg:w-64 xl:w-60 bg-gradient-to-b from-orange-300 to-orange-300 shadow-3xl">
        <div className="flex flex-col items-center p-3 mb-8 bg-white shadow-lg rounded-2xl shadow-gray-300">
          <p className="mt-4 mb-2 text-lg font-semibold text-center text-black">
            Good Morning
          </p>
          <p className="text-sm text-center text-gray-700">Aditya Agrawal</p>
          <p className="text-sm text-center text-gray-500">DATE-{currentDate}</p>
        </div>
        
        <nav className="mt-9">
          <ul className="space-y-9">
            <li>
              <a
                href="/dashboard"
                className="flex items-center font-bold text-black hover:text-yellow-300"
              >
                <svg
                  className="w-6 h-6 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3M16 20.88a9 9 0 111.27-16.28M19.35 10a9 9 0 00-.6 9"
                  ></path>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/patients"
                className="flex items-center font-bold text-black hover:text-yellow-300"
              >
                <svg
                  className="w-6 h-6 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Patients
              </a>
            </li>
            <li>
              <a
                href="/calendar"
                className="flex items-center font-bold text-black hover:text-yellow-300"
              >
                <svg
                  className="w-6 h-6 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Calendar
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="flex items-center font-bold text-black hover:text-yellow-300"
              >
                <svg
                  className="w-6 h-6 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Settings
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="flex items-center font-bold text-black hover:text-yellow-300"
              >
                <svg
                  className="w-6 h-6 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                Support
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 mb-10 ml-4">
          <button
            onClick={handleLogout}
            className="flex items-center font-bold text-black hover:text-yellow-300"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;