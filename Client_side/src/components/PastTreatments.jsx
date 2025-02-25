import React from "react";

const PastTreatments = ({ treatments }) => {
  return (
    <div className="p-3 ml-0 border-2 border-gray-200 bg-slate-200 border-1 rounded-3xl shadow-6xl ">
      <h2 className="mb-4 text-xl font-bold text-black-1000">
        Past Treatments
      </h2>
      <div className="space-y-4">
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
          >
            <div>
              <p className="text-lg font-bold text-black">{treatment.date}</p>
              <p className="text-gray-400 text-ml">
                Treatment:{" "}
                <span className="font-medium text-gray-800">
                  {treatment.type}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Doctor:{" "}
                <span className="font-medium text-gray-800">
                  {treatment.doctor}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastTreatments;
