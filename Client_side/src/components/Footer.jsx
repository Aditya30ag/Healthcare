import React from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaHospital, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Review Section */}
        <div className="lg:w-full">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
            Drop Your Review
          </h2>
          <p className="text-gray-300 mb-3">
            Share your thoughts and help us improve!
          </p>
          <div className="flex items-center border-b border-gray-500 pb-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent text-gray-300 placeholder-gray-400 py-2 px-2 focus:outline-none"
            />
            <button className="ml-2 text-xl text-cyan-400 hover:text-white transition duration-200">
              &#8594;
            </button>
          </div>
        </div>

        {/* Social Handles */}
        <div className="lg:w-full">
          <h3 className="text-lg font-semibold mb-4 text-amber-400">Connect with Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <FaInstagram className="text-pink-500" />
              <a href="#" className="hover:text-white">Instagram</a>
            </li>
            <li className="flex items-center space-x-2">
              <FaWhatsapp className="text-green-500" />
              <a href="#" className="hover:text-white">WhatsApp</a>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-400" />
              <a href="mailto:support@example.com" className="hover:text-white">Email Us</a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="lg:w-full">
          <h3 className="text-lg font-semibold mb-4 text-violet-400">Support & Help</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <FaHospital className="text-red-400" />
              <a href="#" className="hover:text-white">Find Hospitals</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Help & FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhoneAlt className="text-green-400" />
              <a href="#" className="hover:text-white">Contact Us</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CityCare. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
