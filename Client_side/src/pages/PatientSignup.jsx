import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function PatientSignup() {
  const hospitalId = useParams();
  const id = hospitalId.hospitalId;
  // console.log("new: ", id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMed] = useState("");

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center h-screen place-content-center">
        <div className="w-[88vh] h-[68vh]  border-black rounded-lg bg-white">
          <center className="items-center p-2 ">
            <h1>Patient Sign up</h1>
          </center>
          <div className="px-2">
            <p className="py-2 pl-1 m-0 font-medium"> Name </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium"> Email </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium"> Password </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium"> Phone Number </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium"> Age </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium">Medical History </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setMed(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div className="px-3 py-3">
            <button
              onClick={async () => {
                const response = await axios.post(
                  `http://localhost:8080/api/patient/signup/${id}`,
                  {
                    name,
                    email,
                    password,
                    phoneNumber,
                    age,
                  }
                );
                alert("Appointment booked Successfully");
                localStorage.setItem("userType", "patient");
                navigate("/patient-dashboard");

                //  console.log("this is the response bc", response.data.token);
                localStorage.setItem("token", response.data.token);
              }}
              type="button"
              className="w-full h-9 bg-[rgba(240,78,47,255)] rounded-md text-white"
            >
              Sign up
            </button>
            <div className="flex justify-center">
              <div className="cursor-pointer ">
                Hospital already Registered?{" "}
              </div>
              <div className="underline cursor-pointer"> Signin</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PatientSignup;
