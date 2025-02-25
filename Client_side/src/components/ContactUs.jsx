import React, { useState } from "react";

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={toggleModal}
        className="px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
      >
        Contact Us
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={toggleModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              &#10005;
            </button>
            <h2 className="mb-4 text-2xl font-bold text-center">Contact Us</h2>
            <div className="mb-4">
              <p className="text-lg">
                Instagram:{" "}
                <a
                  href="https://instagram.com/yourinstaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  @yourinstaid
                </a>
              </p>
              <p className="text-lg">
                Email:{" "}
                <a
                  href="mailto:youremail@example.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  youremail@example.com
                </a>
              </p>
              <p className="text-lg">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-blue-600 hover:text-blue-800"
                >
                  +1 234 567 890
                </a>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
