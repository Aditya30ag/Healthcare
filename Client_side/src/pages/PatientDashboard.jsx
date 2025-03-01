import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import SearchBarNew from "../components/SearchBarNew";
import PatientDetails from "../components/PatientDetails";
import PastTreatments from "../components/PastTreatments";
import BMICalculator from "../components/BMICalculator";
import InputBar from "../components/InputBar";
import Chatbot from "../components/AIhealth";
import WaterNutritionTracker from "../components/NutritionTracker";
import PeriodOvulationTracker from "../components/Peroid";

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const treatmentsData = [
    { date: "18 Aug '24", type: "Orthopaedic", doctor: "Dr. Sachin Sen" },
    { date: "30 Apr '24", type: "Pulmonary", doctor: "Dr. Tom Alter" },
  ];

  // Safety alerts for this patient
  const safetyAlerts = [
    {
      type: "Allergy",
      message: "Patient has severe penicillin allergy",
      severity: "high",
    },
    {
      type: "Fall Risk",
      message: "High fall risk - assistance required",
      severity: "high",
    },
    {
      type: "Medication",
      message: "Check for drug interactions with new prescription",
      severity: "medium",
    },
  ];

  // Upcoming appointments
  const appointments = [
    {
      date: "12 Mar '25",
      time: "10:30 AM",
      doctor: "Dr. Anita Sharma",
      department: "Cardiology",
    },
    {
      date: "28 Mar '25",
      time: "2:00 PM",
      doctor: "Dr. Vijay Kapoor",
      department: "Neurology",
    },
  ];

  // Vitals history
  const vitalsHistory = [
    {
      date: "01 Mar '25",
      bp: "135/85",
      pulse: 78,
      temp: 98.6,
      respRate: 16,
      oxygenSat: 97,
    },
    {
      date: "20 Feb '25",
      bp: "140/90",
      pulse: 82,
      temp: 99.1,
      respRate: 18,
      oxygenSat: 95,
    },
    {
      date: "01 Feb '25",
      bp: "138/88",
      pulse: 75,
      temp: 98.4,
      respRate: 15,
      oxygenSat: 96,
    },
  ];

  // Get severity color for alerts
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex mt-16 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <main className="flex-1 p-4">
          <div className="mb-4">
            {/* Safety Alerts Banner */}
            {safetyAlerts.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-lg font-bold text-red-700 flex items-center mb-2">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  Patient Safety Alerts
                </h2>
                <div className="space-y-2">
                  {safetyAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-2 border rounded-md flex items-start ${getSeverityColor(
                        alert.severity
                      )}`}
                    >
                      <span className="font-bold mr-2">{alert.type}:</span>{" "}
                      {alert.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-2">
            <PatientDetails />
          </div>
          <div className="fixed bottom-4 right-4 z-10">
            <button
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
            >
              {isChatbotOpen ? "❌" : "💬"}
            </button>

            {isChatbotOpen && (
              <div className="fixed bottom-16 right-4 z-50 rounded-xl shadow-lg p-4 w-96 h-[500px]">
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/WFstMZKdEyyuwbjxfxKei"
                  className="w-full h-full rounded-lg border border-gray-700 bg-slate-400"
                  frameBorder="0"
                ></iframe>
              </div>
            )}
          </div>
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mt-4">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "vitals"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("vitals")}
            >
              Vitals History
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "treatments"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("treatments")}
            >
              Past Treatments
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "appointments"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 p-4 bg-white border border-gray-200 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Health Metrics</h2>

                  {/* Quick Vitals Summary */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Latest Vitals (01 Mar '25)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-500">BP</div>
                        <div className="font-bold text-blue-700">135/85</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Pulse</div>
                        <div className="font-bold text-green-700">78 bpm</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Temp</div>
                        <div className="font-bold text-yellow-700">98.6°F</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Resp</div>
                        <div className="font-bold text-purple-700">16/min</div>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded-lg text-center">
                        <div className="text-sm text-gray-500">O₂ Sat</div>
                        <div className="font-bold text-indigo-700">97%</div>
                      </div>
                    </div>
                  </div>

                  {/* Past Treatments Summary */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Recent Treatments
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Doctor
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {treatmentsData.map((treatment, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {treatment.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {treatment.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {treatment.doctor}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 p-4 bg-white border border-gray-200 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">BMI Calculator</h2>
                  <BMICalculator />

                  {/* Safety tips */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-700">
                      Weight Management Safety Tips
                    </h3>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>
                        Consult doctor before starting new exercise regimen
                      </li>
                      <li>Stay hydrated during physical activity</li>
                      <li>Monitor heart rate during exercise</li>
                      <li>Report unusual symptoms immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vitals" && (
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Vitals History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Pressure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pulse Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Temperature
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resp. Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          O₂ Saturation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vitalsHistory.map((vital, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vital.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vital.bp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vital.pulse} bpm
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vital.temp}°F
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vital.respRate}/min
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vital.oxygenSat}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Vitals Safety Information */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Normal Ranges
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div>
                      <p className="font-medium">Blood Pressure:</p>
                      <p className="text-gray-600">90/60 - 120/80 mmHg</p>
                    </div>
                    <div>
                      <p className="font-medium">Pulse Rate:</p>
                      <p className="text-gray-600">60-100 bpm</p>
                    </div>
                    <div>
                      <p className="font-medium">Temperature:</p>
                      <p className="text-gray-600">97.8°F - 99.1°F</p>
                    </div>
                    <div>
                      <p className="font-medium">Resp. Rate:</p>
                      <p className="text-gray-600">12-20 breaths/min</p>
                    </div>
                    <div>
                      <p className="font-medium">O₂ Saturation:</p>
                      <p className="text-gray-600">95% - 100%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "treatments" && (
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Past Treatments</h2>
                <PastTreatments treatments={treatmentsData} />

                {/* Treatment Safety Guidelines */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-medium text-yellow-700 mb-2">
                    Important Treatment Guidelines
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                    <li>
                      Always follow prescribed medication dosage and schedule
                    </li>
                    <li>
                      Report any adverse reactions immediately to your
                      healthcare provider
                    </li>
                    <li>
                      Complete full course of antibiotics even if symptoms
                      improve
                    </li>
                    <li>
                      Maintain follow-up appointments to monitor treatment
                      effectiveness
                    </li>
                    <li>
                      Keep an updated list of all medications to prevent
                      interactions
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">
                  Upcoming Appointments
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.doctor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                              Reschedule
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Appointment Preparation Guidelines */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-700 mb-2">
                    Appointment Preparation
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                    <li>Fast for 8 hours before blood work appointments</li>
                    <li>Bring current medication list to all appointments</li>
                    <li>
                      Arrive 15 minutes early to complete necessary paperwork
                    </li>
                    <li>Prepare questions for your doctor in advance</li>
                    <li>
                      Bring a friend or family member for support if needed
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <Chatbot />
            </div>
            <div className="flex-1 min-w-[300px]">
              <WaterNutritionTracker />
            </div>
            <div className="flex-1 min-w-[300px]">
              <PeriodOvulationTracker />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex gap-4 mt-4">
            <a
                href="/sysmptoms-api"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
              <div
                onClick={() => navigate("/sysmptoms-api")}
                className="w-64 p-3 text-lg font-medium text-center text-white rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-md cursor-pointer transition-transform transform hover:scale-105"
              >
                Symptom Tracker
              </div></a>
              <a
                href="http://127.0.0.1:5000"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <div className="w-64 p-3 text-lg font-medium text-center text-white rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-md cursor-pointer transition-transform transform hover:scale-105">
                  ECG Scanner
                </div>
              </a>
            </div>
          </div>

          {/* Emergency Contact Information */}
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-lg font-bold text-red-700 mb-2">
              Emergency Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-medium">Hospital Emergency:</p>
                <p className="text-gray-800">+1 (555) 911-0000</p>
              </div>
              <div>
                <p className="font-medium">Patient's Emergency Contact:</p>
                <p className="text-gray-800">
                  Rajesh Agrawal: +1 (555) 123-4567
                </p>
              </div>
              <div>
                <p className="font-medium">Primary Care Physician:</p>
                <p className="text-gray-800">
                  Dr. Anita Sharma: +1 (555) 987-6543
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default PatientDashboard;
