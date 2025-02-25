import React from "react";
import Navbar from "../components/Navbar";

const ECGScanner = () => {
  const handleScanClick = () => {
    // Open ECG scanning interface in a new tab
    window.open('/ecg-scanning-interface', '_blank');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl p-10 bg-white shadow-2xl rounded-2xl">
          {/* Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800">
            ECG Scanner
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Click the button below to start scanning ECG readings
          </p>

          {/* Main Scanner Section */}
          <div className="mt-8 space-y-8">
            {/* Scanner Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Scan Requirements
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-center">
                    • Ensure proper electrode placement
                  </li>
                  <li className="flex items-center">
                    • Patient should be relaxed and still
                  </li>
                  <li className="flex items-center">
                    • Check battery level of ECG device
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  Quick Tips
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    • Clean skin surface before placement
                  </li>
                  <li className="flex items-center">
                    • Minimize electrical interference
                  </li>
                  <li className="flex items-center">
                    • Record patient information first
                  </li>
                </ul>
              </div>
            </div>

            {/* Scan Button */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <button
                onClick={handleScanClick}
                className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-full shadow-xl 
                         hover:bg-blue-700 transform hover:scale-105 transition duration-300 
                         flex items-center justify-center space-x-3"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Start ECG Scan</span>
              </button>
              <p className="text-sm text-gray-500">
                This will open the scanning interface in a new tab
              </p>
            </div>

            {/* Additional Information */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Important Notes
              </h3>
              <p className="text-gray-600">
                The ECG scanning interface will provide real-time monitoring and analysis
                of cardiac activity. Make sure all necessary preparations are complete
                before starting the scan. For emergency situations, please contact the
                emergency department immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ECGScanner;