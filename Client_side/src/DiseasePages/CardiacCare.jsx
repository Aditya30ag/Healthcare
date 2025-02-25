import React from "react";
import img from "../assets/cardiacCare.png";
import Navbar from "../components/Navbar";

function CardiacCare() {
  return (
    <div>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen mt-12 bg-center bg-cover"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
  );
}

export default CardiacCare;
