import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddDoctor = () => {
  const { hospitalId } = useParams();
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [doctorStatus, setDoctorStatus] = useState("");
  const [doctorExperience, setExperience] = useState("");
  const [doctorQualification, setQualification] = useState("");
  const [doctorContactNumber, setNumber] = useState("");

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/hospital/add-doctor/${hospitalId}`,
        {
          doctorName,
          doctorSpecialization,
          doctorExperience,
          doctorQualification,
          doctorContactNumber,
        }
      );
      alert("Doctor added successfully!");
      setDoctorName("");
      setDoctorSpecialization("");
      setDoctorStatus("");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor. Please try again.");
    }
  };

  const inputClasses = "block w-full p-3 mt-1 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 bg-gradient-to-r from-gray-500 to-gray-600">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold">Add New Doctor</h2>
                  <p className="mt-4 text-lg">
                    Register a new healthcare professional to your hospital's team
                  </p>
                  <div className="mt-8">
                    <img
                      src="https://cdn.wallpapersafari.com/47/35/R1oS3j.jpg"
                      alt="Healthcare illustration"
                      className="mx-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleAddDoctor} className="space-y-6">
                <div>
                  <label className={labelClasses}>Doctor Name</label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Enter doctor's full name"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Specialization</label>
                  <input
                    type="text"
                    value={doctorSpecialization}
                    onChange={(e) => setDoctorSpecialization(e.target.value)}
                    placeholder="e.g., Cardiology, Neurology"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Experience (years)</label>
                  <input
                    type="number"
                    value={doctorExperience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Years of experience"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Contact Number</label>
                  <input
                    type="tel"
                    value={doctorContactNumber}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter contact number"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Qualification</label>
                  <input
                    type="text"
                    value={doctorQualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g., MBBS, MD"
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className={labelClasses}>Status</label>
                  <select
                    value={doctorStatus}
                    onChange={(e) => setDoctorStatus(e.target.value)}
                    className={inputClasses}
                    required
                  >
                    <option value="" disabled>Select availability status</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-6 text-lg font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Add Doctor
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;