import React from "react";
import cancer from "../assets/cancerCare.png";
import Navbar from "../components/Navbar";

const CancerCare = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen mt-12 bg-center bg-cover"
        style={{ backgroundImage: `url(${cancer})` }}
      ></div>
    </>
  );
};

export default CancerCare;
