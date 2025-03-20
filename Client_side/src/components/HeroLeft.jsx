import React from "react";
import { useNavigate } from "react-router-dom";

function HeroLeft() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row justify-between p-10 bg-gray-50">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
        <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">
          Specialities
        </h2>
        <h1 className="mt-4 text-4xl lg:text-5xl font-bold leading-snug text-gray-800">
          An Ecosystem for <br /> Clinical Excellence
        </h1>

        {/* Symptom Tracker Button */}
        <div className="flex gap-4 mt-4">
          <div
            onClick={() => navigate("/sysmptoms-api")}
            className="w-64 p-3 text-lg font-medium text-center text-white rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-md cursor-pointer transition-transform transform hover:scale-105"
          >
            Symptom Tracker
          </div>
          <a
            href="http://127.0.0.1:5000"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <div className="w-64 p-3 text-lg font-medium text-center text-white rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-md cursor-pointer transition-transform transform hover:scale-105">
              ECG Scanner
            </div>
          </a>
        </div>
      </div>

      
    </div>
  );
}

export default HeroLeft;
