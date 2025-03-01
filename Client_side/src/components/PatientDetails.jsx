import React from "react";

function PatientDetails() {
  // Patient data
  const patient = {
    _id: "67b750feeef2e16bb41ba999",
    name: "Aditya Agrawal",
    email: "abjdhbah",
    password: "jbdalbjj", // Note: Should not display password in production
    phoneNumber: "0361161877",
    age: 67,
    dateAdded: "2025-02-20T15:57:50.365+00:00",
    createdAt: "2025-02-20T15:57:50.365+00:00",
    updatedAt: "2025-02-20T15:57:50.365+00:00",
    __v: 0,
    // Additional fields
    sex: "Male",
    bloodType: "A+",
    department: "Neurology",
    bedNumber: "0513",
    checkInDate: "2025-02-20",
    emergencyContact: "+1 (555) 123-4567",
    allergies: ["Penicillin", "Peanuts"],
    lastVisit: "2024-12-15"
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center p-6 bg-white rounded-lg shadow-2xl shadow-gray-500 w-full mx-auto h-auto border-solid border-l-4 border-blue-500">
      <div className="flex-shrink-0 mb-4 sm:mb-0">
        <div className="flex items-center justify-center w-24 h-24 border-blue-400 rounded-full border-2">
          <img
            src="/api/placeholder/96/96"
            alt="Patient Avatar"
            className="object-cover w-24 h-24 rounded-full"
          />
        </div>
        <div className="mt-2 text-center">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Active</span>
        </div>
      </div>

      <div className="text-center sm:ml-6 sm:text-left">
        <div className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Patient
        </div>
        <div className="text-lg font-bold text-gray-600">{patient.name}</div>
        <div className="text-sm text-gray-500">ID: {patient._id.substring(0, 8)}...</div>
        <div className="flex space-x-2 mt-2">
          <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">VIEW PROFILE</button>
          <button className="px-3 py-1 text-sm text-white bg-purple-500 rounded hover:bg-purple-600">EDIT</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 mt-4 text-sm text-center text-gray-500 sm:mt-0 sm:ml-auto gap-x-12 gap-y-4 sm:text-left">
        <div>
          <span className="font-bold text-gray-800">Sex:</span> {patient.sex}
        </div>
        <div>
          <span className="font-bold text-gray-800">Age:</span> {patient.age}
        </div>
        <div>
          <span className="font-bold text-gray-800">Blood:</span> {patient.bloodType}
        </div>
        <div>
          <span className="font-bold text-gray-800">Check-in:</span> {formatDate(patient.checkInDate)}
        </div>
        <div>
          <span className="font-bold text-gray-800">Dept:</span> {patient.department}
        </div>
        <div>
          <span className="font-bold text-gray-800">Bed #:</span> {patient.bedNumber}
        </div>
        <div>
          <span className="font-bold text-gray-800">Phone:</span> {patient.phoneNumber}
        </div>
        <div>
          <span className="font-bold text-gray-800">Last Visit:</span> {formatDate(patient.lastVisit)}
        </div>
        <div>
          <span className="font-bold text-gray-800">Emergency:</span> {patient.emergencyContact}
        </div>
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-4 self-start">
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="text-sm font-bold text-gray-800 mb-1">Allergies</h3>
          <div className="flex flex-wrap gap-1">
            {patient.allergies.map((allergy, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                {allergy}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;