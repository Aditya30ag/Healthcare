import React from 'react'
import Navbar from '../components/Navbar'
import img from "../assets/neuroscience.png"

function Neuroscience() {
  return (
    <div>
         <div>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen mt-12 bg-center bg-cover"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
    </div>
  )
}

export default Neuroscience
