import React, { useRef, useState, useEffect } from "react";
import { FaHospitalUser } from "react-icons/fa";
import GlowingButton from "./GlowingButton";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import SideScroll from "./SideScroll";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [id, setId] = useState(null); // State to track ID in localStorage

  useEffect(() => {
    setId(localStorage.getItem("id")); // Fetch ID from localStorage on mount
  }, []);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setId(null); // Reset ID in state
    navigate("/");
  };
  const handleDashboardClick = () => {
    const token = localStorage.getItem("token");
    const hospitalId = localStorage.getItem("id");
    
    if (token && hospitalId) {
      navigate(`/hospital-dashboard/${hospitalId}`);
    } else {
      navigate("/hospital-signin");
    }
  };
  return (
    <>
      <nav className="flex fixed top-0 left-0 w-full h-[9vh] justify-around px-2 text-xl shadow-sm z-10 bg-white">
        <div className="flex p-2">
          <a href="/">
            <FaHospitalUser color="black" size={60} />
          </a>
          <div className="px-3 pt-3 text-3xl max-md:text-xl max-md:mt-2">
            <a href="/" className="text-black no-underline">
              CityCare
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex pt-[2vh] gap-x-8 text-slate-600 max-lg:hidden">
          <div className="flex p-2 cursor-pointer gap-x-8">
          <div onClick={handleDashboardClick} className="duration-100 hover:scale-110">
              Hospital Dashboard
            </div>
            
            
            {/* Sign In / Sign Up Dropdown */}
            <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
              <span className="no-underline text-slate-600 cursor-pointer">
                Sign Up / Sign In
              </span>
              {isDropdownOpen && (
                <div className="absolute left-0 p-3 bg-white shadow-lg h-auto w-52 rounded-xl text-slate-600">
                  {/* Hide Hospital Login if ID is present */}
                  {!id && (
                    <a href="/hospital-signin" className="block no-underline duration-300 border-b-2 hover:scale-110">
                      Hospital Login
                    </a>
                  )}

                  {/* Hide Patient & Admin Login if ID is missing */}
                  {id && (
                    <>
                      <a href={`/patient-signin/${id}`} className="block pt-3 no-underline duration-300 border-b-2 hover:scale-110">
                        Patient Login
                      </a>
                      {/* <a href="/admin-login" className="block pt-3 no-underline duration-300 border-b-2 hover:scale-110">
                        Admin Login
                      </a> */}
                    </>
                  )}

                  {/* Show Logout only if ID is present */}
                  {id && (
                    <div onClick={handleLogout} className="block pt-3 no-underline duration-300 border-b-2 hover:scale-110 cursor-pointer">
                      Logout
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div onClick={() => navigate("/dispensation")} className="hover:scale-110">
              Medication
            </div>
            <div onClick={scrollToBottom} className="duration-100 hover:scale-110">
              Contact Us
            </div>
          </div>
        </div>

        {/* Glowing Button and Mobile Menu */}
        <div onClick={() => navigate("/emergency")} className="pt-[1.5vh] flex pl-14">
          <GlowingButton />
          <div onClick={() => setNav(!nav)} className="mt-1 ml-5 sm:hidden">
            {nav ? <RxCross1 size={35} /> : <RxHamburgerMenu size={35} />}
          </div>
        </div>

        {/* Side Scroll Menu */}
        <SideScroll nav={nav} />
      </nav>
    </>
  );
}

export default Navbar;
