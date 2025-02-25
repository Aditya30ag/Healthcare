import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function AllDoctorPages() {
  const [doctors, setDoctors] = useState([]);
 

  useEffect(() => {
    async function getDoctor() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/get-all-doctors"
        );
        setDoctors(response.data.doctors);
        // console.log(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    getDoctor();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-4 mt-24">
        {doctors.map((doctor) => (
          <div
            key={doctor.id} // Use a unique key for each doctor
            className="w-full p-4 transition-shadow duration-300 bg-white border-solid rounded-lg shadow-lg sm:w-80 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              {/* <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full" /> */}
              <div>
                <h2 className="text-xl font-bold capitalize text-black-800">
                  {doctor.name} {/* Ensure this matches the correct property */}
                </h2>
                <p className="capitalize text-mg text-slate-500">
                 Specialization: {doctor.specialisation
                  }
                </p>
                <p className="capitalize text-mg text-slate-500">
                 Qulaification: {doctor.qualification}
                </p>
                <p className="capitalize text-mg text-slate-500">
                 Experience: {doctor.experience}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {/* Additional doctor information can go here */}
            </div>
            <div className="flex items-center justify-between mt-4">
              {/* More doctor details can be added here */}
            </div>
            <div className="flex mt-4 space-x-2">
              {/* Booking appointment functionality */}
              <button
                onClick={() => {
                  // Replace with correct hospitalId if available
                  const hospitalId = doctor.hospitalId;
                  navigate(`/patient-signup/${hospitalId}`);
                }}
                className="px-4 py-2 text-gray-700 transition-colors duration-300 bg-red-100 rounded hover:bg-red-200"
              >
                Book An Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllDoctorPages;
