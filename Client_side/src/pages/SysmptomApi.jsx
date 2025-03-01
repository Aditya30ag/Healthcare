import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const symptomDatabase = {
  fever: { condition: "Common flu or cold.", doctor: "General Physician" },
  cough: { condition: "Possible respiratory infection.", doctor: "Pulmonologist" },
  headache: { condition: "Could be a migraine or tension headache.", doctor: "Neurologist" },
  "sore throat": { condition: "May indicate a throat infection.", doctor: "ENT Specialist" },
  fatigue: { condition: "Could be caused by stress or illness.", doctor: "General Physician" },
  "chest pain": { condition: "Could be related to heart issues or muscular strain.", doctor: "Cardiologist" },
  "shortness of breath": { condition: "May indicate respiratory or heart issues.", doctor: "Pulmonologist" },
  nausea: { condition: "Can be due to digestive issues or infections.", doctor: "Gastroenterologist" },
  dizziness: { condition: "Could be related to inner ear issues or low blood pressure.", doctor: "Neurologist" },
  "joint pain": { condition: "Could be arthritis or musculoskeletal issues.", doctor: "Rheumatologist" },
  rashes: { condition: "May be due to skin conditions or allergies.", doctor: "Dermatologist" },
  "abdominal pain": { condition: "May indicate gastrointestinal issues.", doctor: "Gastroenterologist" },
  "swollen legs": { condition: "Could be circulatory or kidney-related.", doctor: "Cardiologist" },
  insomnia: { condition: "May be caused by stress, anxiety, or sleep disorders.", doctor: "Sleep Specialist" },
};

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState([]);

  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter((sym) => sym !== symptom)
        : [...prevSymptoms, symptom]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedResults = selectedSymptoms.map((symptom) => symptomDatabase[symptom]).filter(Boolean);
    setResults(matchedResults);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl p-10 bg-white shadow-2xl rounded-2xl">
          {/* Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800">Symptom Checker</h2>
          <p className="text-center text-gray-600 mt-2">
            Select your symptoms to get a possible diagnosis.
          </p>

          {/* Symptom Selection */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.keys(symptomDatabase).map((symptom) => (
                <div
                  key={symptom}
                  className={`p-4 text-center rounded-lg cursor-pointer transition duration-300 shadow-lg
                              ${
                                selectedSymptoms.includes(symptom)
                                  ? "bg-blue-500 text-white shadow-md"
                                  : "bg-gray-50 text-gray-700 border border-gray-300"
                              }
                              hover:bg-blue-400 hover:text-white hover:scale-105`}
                  onClick={() => handleSymptomClick(symptom)}
                >
                  <p className="text-lg font-medium capitalize">{symptom}</p>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Check Symptoms
              </button>
            </div>
          </form>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-800">Possible Conditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {results.map((result, index) => (
                  <div key={index} className="p-4 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold text-gray-800">{result.condition}</h4>
                    <p className="text-green-600 font-medium">
                      Recommended Doctor: {result.doctor}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

         
        </div>
      </div>
    </>
  );
};

export default SymptomChecker;
