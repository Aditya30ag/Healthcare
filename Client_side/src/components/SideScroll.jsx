import React from 'react'

function SideScroll({nav}) {
  return (
    <div>
      <ul
          className={`absolute mt-16 sm:hidden top-0 left-0 flex flex-col items-center justify-center w-full h-screen text-gray-500 bg-white  transition-transform duration-300 ${
            nav ? "transform translate-x-0" : "transform -translate-x-full"
          }`}
        >
          <li className="px-4 py-6 text-4xl cursor-pointer hover:scale-110">
            Home
          </li>
          <li className="px-4 py-6 text-4xl cursor-pointer hover:scale-110">
            Services
          </li>
          <li className="px-4 py-6 text-4xl cursor-pointer hover:scale-110">
            Contact Us
          </li>
          <li className="px-4 py-6 text-4xl cursor-pointer hover:scale-110">
            Login
          </li>
          <li className="px-4 py-6 text-4xl cursor-pointer hover:scale-110">
            SignUp
          </li>
        </ul>
    </div>
  )
}

export default SideScroll
