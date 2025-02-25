import React from "react";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import useDoctors from "../Hooks/Doctors";
import { useParams } from "react-router-dom";

function DoctorList() {
  const { hospitalId } = useParams();
  console.log(hospitalId)
  const { doctors, loading, error } = useDoctors();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-50 mt-14">
        <h1 className="text-4xl font-bold text-center lg-8">
          Specialised Doctors
        </h1>
        <div class="box-border h-130 w-130 p-15 border-8 ..."></div>
        <div className="flex flex-wrap justify-center gap-6">
          <div></div>
          {doctors.map((doctors) => (
            <DoctorCard doctors={doctors} hospitalId={hospitalId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
