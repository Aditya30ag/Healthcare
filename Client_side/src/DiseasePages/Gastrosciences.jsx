import React from 'react'
import Navbar from '../components/Navbar'
import img from "../assets/gastroscience.jpeg"

function Gastrosciences() {
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

export default Gastrosciences
