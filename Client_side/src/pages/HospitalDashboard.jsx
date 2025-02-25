import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import AddDoctor from "../components/AddDoctor"; // Make sure this is the correct path

function HospitalDashboard() {
  const [patients, setPatients] = useState([]);
  const [hospitalData, setHospitalData] = useState(null);
  const { hospitalId } = useParams();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/hospital/get-patients/${hospitalId}`
        );
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [hospitalId]);

  useEffect(() => {
    const getHospital = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/hospital/get-hospital/${hospitalId}`
        );
        setHospitalData(response.data);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };
    getHospital();
  }, [hospitalId]);

  if (!hospitalData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen gap-4 p-8 mt-12 bg-gradient-to-r">
        <div className="font-mono text-3xl">
          {hospitalData.hospital.hospitalName}
        </div>
        <div className="flex flex-col w-full gap-4">
          {/* <FeatureCard
            title="Total payCheque"
            content={
              <>
                <div className="text-3xl font-bold">$20,500.05</div>
                <div className="flex justify-between mt-4 max-md:hidden max-md:w-[32rem]">
                  <div>
                    <div>Replenishment</div>
                    <div>Last: April 2nd, 2024</div>
                    <div>Next: May 2nd, 2024</div>
                  </div>
                  <div>
                    <div>Budget</div>
                    <div>Daily: $200</div>
                    <div>Monthly: $5,000</div>
                  </div>
                  <div>
                    <div>Income</div>
                    <div>Last Month: $10,000</div>
                    <div>This Month: $15,000</div>
                  </div>
                </div>
              </>
            }
            bgColor="bg-slate-100 text-black"
            extraClasses="flex-grow"
          /> */}
          <PatientQueue patients={patients} />

          <AddDoctor hospitalId={hospitalId} />
        </div>
      </div>
    </>
  );
}

const FeatureCard = ({ title, content }) => (
  <div className={`p-4 w-[50rem] rounded-lg bg-slate-100 `}>
    <h3 className="mb-4 text-xl font-bold">{title}</h3>
    <div>{content}</div>
  </div>
);

const PatientQueue = ({ patients }) => (
  <div className="flex flex-col w-full p-4 text-black rounded-lg bg-slate-100">
    <h3 className="mb-4 text-xl font-bold text-black">Patient Queue</h3>
    <div className="flex-grow p-4 overflow-y-scroll bg-white rounded-lg">
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Date</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Doctor Name</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} className="shadow-sm rounded-xl hover:bg-gray-100">
              <td className="py-2">{patient.name}</td>
              <td className="py-2">
                {new Date(patient.dateAdded).toLocaleDateString()}
              </td>
              <td className="py-2">OPD/500</td>
              <td className="py-2">{patient.doctorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default HospitalDashboard;
