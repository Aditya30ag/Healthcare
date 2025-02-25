import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import SearchBarNew from "../components/SearchBarNew";
import PatientDetails from "../components/PatientDetails";
import PastTreatments from "../components/PastTreatments";
import BMICalculator from "../components/BMICalculator";
import InputBar from "../components/InputBar";

function PatientDashboard() {
  const treatmentsData = [
    { date: "18 Aug ’24", type: "Orthopaedic", doctor: "Dr. Sachin Sen" },
    { date: "30 Apr ’24", type: "Pulmonary", doctor: "Dr. Tom Alter" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex mt-16 bg-[url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.publicdomainpictures.net%2Fen%2Fview-image.php%3Fimage%3D124678%26picture%3Dpink-top-gradient-background&psig=AOvVaw2-8mhUXuzjwbkWmIoo3-Ce&ust=1725011365967000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMjMuv72mYgDFQAAAAAdAAAAABAK')] ">
        <SideBar />
        <main className="flex-1 p-2 ">
          <div className="p-2 ">
            <InputBar/>
          </div>

          <div className="p-2 ">
            <PatientDetails />
          </div>
          <div className="grid grid-cols-3 gap-0 mt-4 sm:grid-cols-5">
            <div className="col-span-3 p-3 bg-opacity-0 h-fit ">
              <PastTreatments treatments={treatmentsData} />
            </div>
            <div className="col-span-2 p-3 mt-4 border-2 border-gray-200 h-80dvh rounded-3xl bg-slate-200 border-1 shadow-4xl ">
              <h2 className="mb-4 text-2xl font-bold">BMI Calculator</h2>
              <BMICalculator />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default PatientDashboard;
