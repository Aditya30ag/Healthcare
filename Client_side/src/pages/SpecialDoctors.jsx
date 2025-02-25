import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DoctorNewCard from "../components/DoctorNewCard";
import { useParams } from "react-router-dom";
import axios from "axios";

function SpecialDoctors() {
  const [doctors, setDoctors] = useState([]);
  const fuddu = useParams();
  const specialisation = fuddu.specialisation;
 // console.log(specialisation);
  useEffect(() => {
    async function call() {
      const response = await axios.get(
        `http://localhost:3000/api/v1/hospital/doctors/${specialisation}`
      );
      console.log(response.data);
      setDoctors(response.data.doctors);
    }
    call();
  }, [specialisation]);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-50 mt-14">
        <h1 className="text-4xl font-bold text-center lg-8">
          Specialised Doctors
        </h1>
        <div className="box-border h-130 w-130 p-15 border-8 ..."></div>
        <div className="flex flex-wrap justify-center gap-6">
          <div></div>
          {doctors.map((doctor) => (
            <DoctorNewCard doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpecialDoctors;
