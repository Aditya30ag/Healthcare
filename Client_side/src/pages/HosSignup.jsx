import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HosSignup() {
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAdress] = useState("");
  const [numberOfBeds, setBeds] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className="flex items-center justify-center h-screen place-content-center">
        <div className="w-[88vh] h-[68vh]  border-black rounded-lg bg-white">
          <center className="items-center p-2 ">
            <h1>Sign up</h1>
          </center>
          <div className="px-2">
            <p className="py-2 pl-1 m-0 font-medium"> Hospital Name </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setHospitalName(e.target.value);
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
            <p className="py-2 pl-1 m-0 font-medium"> Contact Number </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium"> Address </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <p className="py-2 pl-1 m-0 font-medium"> Number of beds </p>
            <div className="input-group flex-nowrap">
              <input
                onChange={(e) => {
                  setBeds(e.target.value);
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
                    "http://localhost:3000/api/v1/hospital/signup",
                    {
                      hospitalName,
                      email,
                      password,
                      contactNumber,
                      address,
                      numberOfBeds,
                    }
                  );
                  //  console.log("this is the response bc", response.data.token);
                  localStorage.setItem("token", response.data.token);
                  alert("hospital signed in successfull")
                  console.log(data);
                  localStorage.setItem("id", response.data.id);
                  localStorage.setItem("userType", "hospital");
                  navigate(`/hospital-dashboard/${response.data.id}`);
                } catch (error) {
                  console.error("An error occurred:", error);
                  console.log("Error response data:", error.response.data);
                }
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
              <div
                onClick={() => {
                  navigate("/hospital-signin");
                }}
                className="underline cursor-pointer"
              >
                {" "}
                Signin
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HosSignup;
