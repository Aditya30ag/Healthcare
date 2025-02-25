import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HospitalSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className="flex items-center justify-center h-screen place-content-center">
        <div className="w-[88vh] h-[50vh]  border-black rounded-lg bg-white shadow-md p-3">
          <center className="items-center p-2 ">
            <h1>{email}</h1>
            <p className="text-slate-500">
              Enter your credentials to access your Hospital dashboard
            </p>
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
                    "http://localhost:3000/api/v1/hospital/signin",
                    {
                      email,
                      password,
                    }
                  );

                  // console.log("this is the response bc", response.data);
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("id", response.data.id);
                  localStorage.setItem("userType", "hospital");
                  console.log(response.data.id);
                  navigate(`/hospital-dashboard/${response.data.id}`);
                } catch (error) {
                  console.error("An error occurred:", error);
                  console.log("Error response data:", error.response.data);
                }
              }}
              type="button"
              className="w-full btn btn-dark"
            >
              Sign in
            </button>
            <div className="flex justify-center">
              <div className="cursor-pointer ">Don't have an account? </div>
              <div
                onClick={() => {
                  navigate("/hospital-signup");
                }}
                className="underline cursor-pointer"
              >
                {" "}
                Signup
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HospitalSignin;
