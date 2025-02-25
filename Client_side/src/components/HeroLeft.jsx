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
  <a href="http://127.0.0.1:5000" target="_blank" style={{textDecoration: "none"}}>
  <div
    
    className="w-64 p-3 text-lg font-medium text-center text-white rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-md cursor-pointer transition-transform transform hover:scale-105"
  >
    ECG Scanner
  </div></a>
</div>
      </div>

      {/* Right Section - Specialties List */}
      <div className="lg:w-1/2 w-full">
        <ul className="space-y-6">
          {[
            { name: "Cardiac Care", path: "/cardiac-care", color: "text-red-500" },
            { name: "Cancer Care", path: "/cancer-care", color: "text-gray-700" },
            { name: "Neurosciences", path: "/neurosciences", color: "text-gray-700" },
            { name: "Gastrosciences", path: "/gastrosciences", color: "text-gray-700" },

          ].map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center justify-around cursor-pointer group"
            >
              <div className="flex items-center">
                <span className={`font-semibold transition-colors group-hover:text-red-500 ${item.color}`}>
                  {item.name}
                </span>
              </div>
              <span className="text-xl transition-transform transform group-hover:translate-x-1 group-hover:text-red-500">
                &gt;
              </span>
            </li>
          ))}
        </ul>

        {/* View All Specialties Button */}
        
      </div>
    </div>
  );
}

export default HeroLeft;
