import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorNewCard({ doctor }) {
  const navigate = useNavigate();
  const hospitalId = "66d30c7db1edbdc0f279c000";
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg ; p-3 border-style: solid; w-full sm:w-80 hover:shadow-lg transition-shadow duration-300 box-shadow: 9px 10px;">
        <div className="flex items-center space-x-4">
          {/* <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full bg-80" /> */}
          <div>
            <h2 className="text-xl font-bold capitalize text-black-800">
              name: {doctor.doctorName}
            </h2>
            <p className="capitalize text-mg text-black-500 text-slate-500">
              specialisation: {doctor.doctorSpecialization}
            </p>
            <p className="capitalize text-mg text-black-500 text-slate-500">
              status: {doctor.doctorStatus}
            </p>
            <p className="capitalize text-mg text-black-500 text-slate-500">
              experience: {doctor.doctorExperience}
            </p>
            <p className="capitalize text-mg text-black-500 text-slate-500">
              qualification: {doctor.doctorQualification}
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {/* <p>{doctors.specialty}</p> */}
        </div>
        <div className="flex items-center justify-between mt-4">
          {/* <p className="text-sm text-gray-600">
            Experience: {doctors.experience} Years
          </p> */}
          {/* <p className="text-lg font-semibold text-pink-600">₹ {doctors.fee}</p> */}
        </div>
        <div className="flex mt-4 space-x-2">
          {/* <button className="px-4 py-2 text-white transition-colors duration-300 bg-pink-800 rounded hover:bg-pink-600">
            View Full Profile
          </button> */}
          <button
            onClick={() => {
              navigate(`/patient-signup/${hospitalId}`);
            }}
            className="px-4 py-2 text-gray-700 transition-colors duration-300 bg-red-100 rounded hover:bg-gray-300"
          >
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorNewCard;
