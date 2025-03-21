import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const id=localStorage.getItem("id");
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center h-screen place-content-center">
        <div className="w-[88vh] h-[68vh]  border-black rounded-lg bg-white">
          <center className="items-center p-2 ">
            <h1>Patient Sign up</h1>
          </center>
          <div className="px-2">
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
          </div>
          <div className="px-3 py-3">
            <button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `http://localhost:8080/api/patient/signin/${id}`,
                    {
                      email,
                      password,
                    }
                  );
                  //  console.log("this is the response bc", response.data.token);
                  localStorage.setItem("tokenpatient", response.data.token);
                  localStorage.setItem("patientid", response.data.patientid);
                  localStorage.setItem("userType", "patient");
                  navigate("/patient-dashboard/");
                } catch (error) {
                  console.error("An error occurred:", error);
                  console.log("Error response data:", error.response.data);
                }
              }}
              type="button"
              className="w-full h-9 bg-[rgba(240,78,47,255)] rounded-md text-white"
            >
              Sign In
            </button>
            <div className="flex justify-center">
              <div className="cursor-pointer ">
                First time user?{" "}
              </div>
              <div onClick={()=>{
                navigate(`/patient-signup/${id}`);
              }} className="underline cursor-pointer"> Signup</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PatientSignin;
