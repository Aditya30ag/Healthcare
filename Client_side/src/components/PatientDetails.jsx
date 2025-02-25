import React from "react";

function PatientDetails() {
  return (
    <div className="flex flex-col sm:flex-row items-center p-3 bg-white rounded-lg shadow-2xl shadow-gray-500 w-full  mx-auto h-auto sm:h-[150px] border-solid">
      <div className="flex-shrink-0 mb-4 sm:mb-0">
        <div className="flex items-center justify-center w-24 h-24 border-black rounded-full border-3">
          <img
            src="https://t4.ftcdn.net/jpg/06/10/19/43/360_F_610194339_3CtGOkv4wIiAyybcib4IrFX0nnc83Bv6.jpg"
            alt="Avatar"
            className="object-cover w-24 h-24 rounded-full"
          />
        </div>
      </div>

      <div className="text-center sm:ml-6 sm:text-left">
        <div className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Patient
        </div>
        <div className="text-lg font-bold text-gray-600">Avi Srivastava</div>
        <button className="mt-2 text-sm text-blue-500">VIEW PROFILE</button>
      </div>

      <div className="grid grid-cols-3 mt-4 text-sm text-center text-gray-500 sm:mt-0 sm:ml-auto gap-x-32 gap-y-12 sm:text-left">
        <div>
          <span className="font-bold text-gray-800">Sex:</span> Male
        </div>
        <div>
          <span className="font-bold text-gray-800">Age:</span> 32
        </div>
        <div>
          <span className="font-bold text-gray-800">Blood:</span> B+
        </div>
        <div>
          <span className="font-bold text-gray-800">Check-in:</span> 24 Feb,
          2020
        </div>
        <div>
          <span className="font-bold text-gray-800">Dept:</span> Cardiology
        </div>
        <div>
          <span className="font-bold text-gray-800">Bed #:</span> 0747
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
