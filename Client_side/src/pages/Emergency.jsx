import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

// Updated hospitals data in Delhi with more entries and emergency contacts
const hospitals = [
  {
    name: "AIIMS Delhi",
    location: { lat: 28.5672, lng: 77.21 },
    emergencyContact: "+91 11 2658 8500",
  },
  {
    name: "Safdarjung Hospital",
    location: { lat: 28.5734, lng: 77.2081 },
    emergencyContact: "+91 11 2616 6360",
  },
  {
    name: "Max Super Specialty Hospital",
    location: { lat: 28.5678, lng: 77.2056 },
    emergencyContact: "+91 11 2651 5050",
  },
  {
    name: "Fortis Hospital",
    location: { lat: 28.4986, lng: 77.1859 },
    emergencyContact: "+91 11 4713 4444",
  },
  {
    name: "BLK Super Speciality Hospital",
    location: { lat: 28.6449, lng: 77.1924 },
    emergencyContact: "+91 11 3040 3040",
  },
  {
    name: "Apollo Hospital",
    location: { lat: 28.5375, lng: 77.2457 },
    emergencyContact: "+91 11 2987 1234",
  },
  {
    name: "Sir Ganga Ram Hospital",
    location: { lat: 28.6431, lng: 77.1914 },
    emergencyContact: "+91 11 2575 0000",
  },
  {
    name: "Moolchand Medcity",
    location: { lat: 28.5746, lng: 77.2434 },
    emergencyContact: "+91 11 4200 0000",
  },
  {
    name: "Indraprastha Apollo Hospital",
    location: { lat: 28.5361, lng: 77.2891 },
    emergencyContact: "+91 11 7179 1090",
  },
  {
    name: "Artemis Hospital",
    location: { lat: 28.4595, lng: 77.072 },
    emergencyContact: "+91 124 4511 111",
  },
  {
    name: "Medanta - The Medicity",
    location: { lat: 28.4126, lng: 77.0413 },
    emergencyContact: "+91 124 4141 414",
  },
  {
    name: "Venkateshwar Hospital",
    location: { lat: 28.5897, lng: 77.055 },
    emergencyContact: "+91 11 4855 5555",
  },
  {
    name: "Primus Super Speciality Hospital",
    location: { lat: 28.6016, lng: 77.1797 },
    emergencyContact: "+91 11 6620 6630",
  },
];

const HospitalDirectory = () => {
    
  const [userLocation, setUserLocation] = useState(null);
  const [sortedHospitals, setSortedHospitals] = useState([]);
  const [error, setError] = useState("");

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        (1 - Math.cos(dLon))) /
        2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  // Fetch user's location and sort hospitals by distance
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          const sorted = hospitals.sort((a, b) => {
            const distanceA = calculateDistance(
              userLat,
              userLng,
              a.location.lat,
              a.location.lng
            );
            const distanceB = calculateDistance(
              userLat,
              userLng,
              b.location.lat,
              b.location.lng
            );
            return distanceA - distanceB;
          });

          setSortedHospitals(sorted);
        },
        (error) => setError(`Error: ${error.message}`)
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-screen mt-12 bg-white">
      <main className="container flex-grow px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-blue-900">
          Nearby Hospitals in Delhi
        </h1>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedHospitals.map((hospital, index) => (
              <div
                key={index}
                className="p-6 text-center transition duration-300 transform rounded-lg shadow-lg bg-white-300 hover:shadow-xl"
              >
                <h2 className="mb-2 text-2xl font-bold text-blue-900">
                  {hospital.name}
                </h2>
                {userLocation && (
                  <p className="mb-2 text-gray-700">
                    Distance:{" "}
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      hospital.location.lat,
                      hospital.location.lng
                    ).toFixed(2)}{" "}
                    km
                  </p>
                )}
                <p className="mb-2 text-gray-700">
                  Emergency Contact:{" "}
                  <span className="font-semibold">
                    {hospital.emergencyContact}
                  </span>
                </p>
                <a
                  href={`https://www.google.com/maps?q=${hospital.location.lat},${hospital.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-600 no-underline transition-colors hover:text-blue-800"
                >
                  View on Google Maps
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default HospitalDirectory;
