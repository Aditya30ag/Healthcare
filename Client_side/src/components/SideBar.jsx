import React from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen p-4 text-white w-72 lg:w-64 xl:w-60 bg-gradient-to-b from-orange-300 to-orange-300 shadow-3xl">
        <div className="flex flex-col items-center p-3 mb-8 bg-white shadow-lg rounded-2xl shadow-gray-300">
          <p className="mt-4 mb-2 text-lg font-semibold text-center text-black">
            Good Morning
          </p>
          <p className="text-sm text-center text-gray-700">Avi shrivastava</p>
          <p className="text-sm text-center text-gray-500">DATE-29-08-2024</p>
        </div>
        <nav className="mt-9">
          <ul className="space-y-9">
            <li>
              <a
                href="#"
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
                href="#"
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
                    d="M19 7l-7 7-7-7"
                  ></path>
                </svg>
                Patients
              </a>
            </li>
            <li>
              <a
                href="#"
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
                    d="M12 4v7m0 0l3 3m-6 0l3-3m0 3V4"
                  ></path>
                </svg>
                Calendar
              </a>
            </li>
            <li>
              <a
                href="#"
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
                    d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7"
                  ></path>
                </svg>
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
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
                    d="M19 10l-5 5-5-5"
                  ></path>
                </svg>
                Support
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 mb-10 ml-4">
          <a
            href="#"
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
                d="M15 12h7m0 0l-3-3m3 3l-3 3M9 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4"
              ></path>
            </svg>
            <div
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className=""
            >
              Log Out
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default SideBar;
