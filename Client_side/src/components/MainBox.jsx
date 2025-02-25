import React from "react";
import hospital from "../assets/hospital.png";
import calander from "../assets/appointment.png";
import doctor from "../assets/doctor.png";
import { useNavigate } from "react-router-dom";

function MainBox() {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-3">
        <div
          className={`flex items-center p-4 rounded-lg border border-yellow-200 bg-[#fdfff4] duration-300 hover:scale-95`}
        >
          <div className="mr-4">
            <img src={calander} alt="" className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Book an Appointment</h3>
            <p className="text-gray-600">With country's leading experts</p>
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/hospital-list");
          }}
          className={`flex cursor-pointer items-center p-4 rounded-lg border border-yellow-200 bg-[#ecfaff] duration-300 hover:scale-95`}
        >
          <div className="mr-4">
            <img src={doctor} alt="" className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Hospitals</h3>
            <p className="text-gray-600">Health needs under one roof</p>
          </div>
        </div>
        <div
          className={`flex items-center p-4 rounded-lg border border-yellow-200 bg-[#f8f7ff] duration-300 hover:scale-95`}
        >
          <div className="mr-4">
            <img src={hospital} alt="" className="w-12 h-12" />
          </div>
          <div onClick={()=>{
            navigate("/all-doctors")
          }}>
            <h3 className="text-xl font-bold">Doctors</h3>
            <p className="text-gray-600">Top experts for your health</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBox;
