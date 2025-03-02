import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StyledMapContainer from "./Map";

// Updated hospitals data in Delhi with more entries and emergency contacts
const hospitals = [
  {
    name: "AIIMS Delhi",
    location: { lat: 28.5672, lng: 77.21 },
    emergencyContact: "+91 11 2658 8500",
    specialties: ["Cardiology", "Neurology", "Oncology"],
    beds: 2500,
    type: "Government",
  },
  {
    name: "Safdarjung Hospital",
    location: { lat: 28.5734, lng: 77.2081 },
    emergencyContact: "+91 11 2616 6360",
    specialties: ["General Surgery", "Obstetrics", "Orthopedics"],
    beds: 1800,
    type: "Government",
  },
  {
    name: "Max Super Specialty Hospital",
    location: { lat: 28.5678, lng: 77.2056 },
    emergencyContact: "+91 11 2651 5050",
    specialties: ["Cardiac Sciences", "Oncology", "Orthopedics"],
    beds: 500,
    type: "Private",
  },
  {
    name: "Fortis Hospital",
    location: { lat: 28.4986, lng: 77.1859 },
    emergencyContact: "+91 11 4713 4444",
    specialties: ["Cardiology", "Neurology", "Gastroenterology"],
    beds: 450,
    type: "Private",
  },
  {
    name: "BLK Super Speciality Hospital",
    location: { lat: 28.6449, lng: 77.1924 },
    emergencyContact: "+91 11 3040 3040",
    specialties: ["Transplant", "Cardiac Sciences", "Neurosciences"],
    beds: 650,
    type: "Private",
  },
  {
    name: "Apollo Hospital",
    location: { lat: 28.5375, lng: 77.2457 },
    emergencyContact: "+91 11 2987 1234",
    specialties: ["Oncology", "Orthopedics", "Transplant"],
    beds: 700,
    type: "Private",
  },
  {
    name: "Sir Ganga Ram Hospital",
    location: { lat: 28.6431, lng: 77.1914 },
    emergencyContact: "+91 11 2575 0000",
    specialties: ["Gastroenterology", "Nephrology", "Urology"],
    beds: 675,
    type: "Private",
  },
  {
    name: "Moolchand Medcity",
    location: { lat: 28.5746, lng: 77.2434 },
    emergencyContact: "+91 11 4200 0000",
    specialties: ["Diabetes", "Endocrinology", "Pediatrics"],
    beds: 400,
    type: "Private",
  },
  {
    name: "Indraprastha Apollo Hospital",
    location: { lat: 28.5361, lng: 77.2891 },
    emergencyContact: "+91 11 7179 1090",
    specialties: ["Robotic Surgery", "Transplant", "Oncology"],
    beds: 780,
    type: "Private",
  },
  {
    name: "Artemis Hospital",
    location: { lat: 28.4595, lng: 77.072 },
    emergencyContact: "+91 124 4511 111",
    specialties: ["Cardiology", "Orthopedics", "Neurology"],
    beds: 520,
    type: "Private",
  },
  {
    name: "Medanta - The Medicity",
    location: { lat: 28.4126, lng: 77.0413 },
    emergencyContact: "+91 124 4141 414",
    specialties: ["Cardiac Sciences", "Neurosciences", "Oncology"],
    beds: 1250,
    type: "Private",
  },
  {
    name: "Venkateshwar Hospital",
    location: { lat: 28.5897, lng: 77.055 },
    emergencyContact: "+91 11 4855 5555",
    specialties: ["Cardiology", "General Surgery", "Obstetrics"],
    beds: 325,
    type: "Private",
  },
  {
    name: "Primus Super Speciality Hospital",
    location: { lat: 28.6016, lng: 77.1797 },
    emergencyContact: "+91 11 6620 6630",
    specialties: ["Orthopedics", "Urology", "ENT"],
    beds: 250,
    type: "Private",
  },
  {
    name: "Lok Nayak Hospital",
    location: { lat: 28.6391, lng: 77.2376 },
    emergencyContact: "+91 11 2323 2400",
    specialties: ["General Medicine", "Pediatrics", "Emergency Care"],
    beds: 2000,
    type: "Government",
  },
  {
    name: "GTB Hospital",
    location: { lat: 28.6848, lng: 77.3064 },
    emergencyContact: "+91 11 2265 1000",
    specialties: ["Trauma Care", "General Surgery", "Medicine"],
    beds: 1500,
    type: "Government",
  },
];

const HospitalDirectory = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedHospitals, setSortedHospitals] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Get all unique specialties for filter dropdown
  const allSpecialties = [
    ...new Set(hospitals.flatMap((h) => h.specialties)),
  ].sort();

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
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          const sorted = [...hospitals].sort((a, b) => {
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
          setIsLoading(false);
        },
        (error) => {
          setError(`Error: ${error.message}`);
          setSortedHospitals([...hospitals]);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setSortedHospitals([...hospitals]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  // Filter hospitals based on search term, type and specialty
  const filteredHospitals = sortedHospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || hospital.type === filterType;
    const matchesSpecialty =
      filterSpecialty === "all" ||
      hospital.specialties.includes(filterSpecialty);
    return matchesSearch && matchesType && matchesSpecialty;
  });

  // Handle hospital card click
  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  // Close hospital details modal
  const closeModal = () => {
    setSelectedHospital(null);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-transparent z-50">
        <div className="container px-4 py-8 mx-auto mt-16">
          {/* Hero Section */}
          <div className="py-10 mb-8 text-center bg-gradient-to-r from-yellow-600 to-indigo-700 rounded-xl shadow-lg">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Find Hospitals Near You in Delhi
            </h1>
            <p className="mb-6 text-lg text-yellow-100">
              Quick access to emergency contacts and directions to the nearest
              medical facilities
            </p>
            
          </div>

          {/* Search and Filters */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search hospitals by name..."
                  className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <StyledMapContainer hospitals={hospitals} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HospitalDirectory;
