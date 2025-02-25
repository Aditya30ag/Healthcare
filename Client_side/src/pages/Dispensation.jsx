import React, { useState } from "react";
import Navbar from "../components/Navbar";

const MedicineInfo = () => {
  // State for selected dosages
  const [selectedDosage, setSelectedDosage] = useState({
    paracetamol: 500,
    cetirizine: 10,
    ibuprofen: 400,
    amoxicillin: 500,
  });

  // Function to handle dosage change
  const handleDosageChange = (medicine, dosage) => {
    setSelectedDosage((prevState) => ({
      ...prevState,
      [medicine]: dosage,
    }));
  };

  // Function to open modal
  const [modalContent, setModalContent] = useState(null);

  const openModal = (medicine) => {
    setModalContent(medicineData[medicine].info.details);
    document.getElementById("modal").classList.remove("hidden");
  };

  const closeModal = () => {
    setModalContent(null);
    document.getElementById("modal").classList.add("hidden");
  };

  // Medicine Data
  const medicineData = {
    paracetamol: {
      name: "Paracetamol",
      image: "https://via.placeholder.com/400x200.png?text=Paracetamol",
      options: [250, 500, 650],
      info: {
        250: {
          usage: "Used to relieve mild pain and reduce fever.",
          dosage: "250 mg every 4-6 hours. Max 1 gram in 24 hours.",
          sideEffects: "Nausea, rash, headache.",
        },
        500: {
          usage: "Used for moderate pain and fever relief.",
          dosage: "500 mg every 4-6 hours. Max 4 grams in 24 hours.",
          sideEffects: "Nausea, liver damage with excessive use, rash.",
        },
        650: {
          usage: "Used for severe pain and fever relief.",
          dosage: "650 mg every 4-6 hours. Max 4 grams in 24 hours.",
          sideEffects: "Dizziness, nausea, liver damage.",
        },
        details: `
          <strong>Mechanism:</strong> Reduces prostaglandins, relieving pain & fever.<br>
          <strong>Safety:</strong> Generally safe but can cause liver damage in overdose.<br>
          <strong>Contraindications:</strong> Avoid if you have liver disease.<br>
          <strong>Interactions:</strong> Consult before mixing with other drugs.<br>
        `,
      },
    },
    cetirizine: {
      name: "Cetirizine",
      image: "https://via.placeholder.com/400x200.png?text=Cetirizine",
      options: [5, 10, 20],
      info: {
        5: {
          usage: "Relieves mild allergy symptoms like sneezing & runny nose.",
          dosage: "5 mg once daily.",
          sideEffects: "Drowsiness, dry mouth, fatigue.",
        },
        10: {
          usage: "Used for moderate allergy relief including itching & watery eyes.",
          dosage: "10 mg once daily.",
          sideEffects: "Drowsiness, headache, dry mouth.",
        },
        20: {
          usage: "For severe allergic reactions under medical supervision.",
          dosage: "20 mg once daily. Consult a doctor.",
          sideEffects: "Increased drowsiness, confusion, dry mouth.",
        },
        details: `
          <strong>Mechanism:</strong> Blocks histamine receptors to reduce allergic responses.<br>
          <strong>Safety:</strong> Minimal sedation but can interact with alcohol.<br>
          <strong>Interactions:</strong> May enhance effects of sedatives.<br>
        `,
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12 mt-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Medicine Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {Object.keys(medicineData).map((medicineKey) => {
              const medicine = medicineData[medicineKey];
              const selectedInfo = medicine.info[selectedDosage[medicineKey]];
              return (
                <div
                  key={medicineKey}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={medicine.image}
                    alt={`${medicine.name} Image`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{medicine.name}</h2>
                    <p className="text-gray-600 mt-2">{selectedInfo.usage}</p>
                    <label className="block mt-4">
                      <span className="text-gray-700 font-semibold">Select Dosage:</span>
                      <select
                        value={selectedDosage[medicineKey]}
                        onChange={(e) =>
                          handleDosageChange(medicineKey, parseInt(e.target.value))
                        }
                        className="block w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {medicine.options.map((option) => (
                          <option key={option} value={option}>
                            {option} mg
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="mt-4 text-gray-600">
                      <strong>Dosage Instructions:</strong> {selectedInfo.dosage}
                    </p>
                    <p className="text-gray-600">
                      <strong>Side Effects:</strong> {selectedInfo.sideEffects}
                    </p>
                    <button
                      onClick={() => openModal(medicineKey)}
                      className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                    >
                      More Information
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        <div id="modal" className="fixed inset-0 flex items-center justify-center hidden bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-2xl font-bold text-red-500 hover:text-red-700 transition"
            >
              &times;
            </button>
            <div className="mt-4 overflow-auto max-h-80 text-gray-700" dangerouslySetInnerHTML={{ __html: modalContent }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineInfo;
