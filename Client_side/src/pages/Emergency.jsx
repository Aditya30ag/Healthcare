import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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
      <div className="flex flex-col min-h-screen bg-gray-50">
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
            <button
              onClick={fetchUserLocation}
              className="px-6 py-3 text-yellow-700 bg-white rounded-full shadow-md hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Refresh My Location
              </span>
            </button>
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

              <div className="grid grid-cols-2 gap-4 sm:flex">
                <select
                  className="px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                </select>

                <select
                  className="px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                >
                  <option value="all">All Specialties</option>
                  {allSpecialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status information */}
          <div className="mb-6">
            {isLoading ? (
              <div className="flex items-center justify-center p-6 text-yellow-700">
                <svg
                  className="w-8 h-8 mr-3 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-lg font-semibold">
                  Loading hospitals...
                </span>
              </div>
            ) : error ? (
              <div className="p-4 text-red-700 bg-red-100 rounded-lg">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </p>
                <p className="mt-2 ml-8">
                  Showing hospitals without distance information.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 text-green-700 bg-green-100 rounded-lg">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Showing {filteredHospitals.length} hospitals
                  {filterType !== "all" ? ` (${filterType})` : ""}
                  {filterSpecialty !== "all"
                    ? ` with ${filterSpecialty} specialty`
                    : ""}
                </p>
                {userLocation && (
                  <div className="flex items-center text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Your location: {userLocation.lat.toFixed(4)},{" "}
                    {userLocation.lng.toFixed(4)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hospital list */}
          {filteredHospitals.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mb-2 text-xl font-semibold text-gray-700">
                No hospitals found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search filters or search term.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredHospitals.map((hospital, index) => (
                <div
                  key={index}
                  onClick={() => handleHospitalClick(hospital)}
                  className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="p-1 bg-yellow-600">
                    <div className="py-2 text-center">
                      <span className="text-sm font-semibold text-white uppercase">
                        {hospital.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-bold text-gray-800">
                      {hospital.name}
                    </h2>
                    {userLocation && (
                      <p className="flex items-center mb-3 text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-2 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>
                          <span className="font-medium">
                            {calculateDistance(
                              userLocation.lat,
                              userLocation.lng,
                              hospital.location.lat,
                              hospital.location.lng
                            ).toFixed(2)}{" "}
                            km
                          </span>{" "}
                          away
                        </span>
                      </p>
                    )}
                    <p className="flex items-center mb-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="font-medium">
                        {hospital.emergencyContact}
                      </span>
                    </p>
                    <p className="flex items-center mb-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>{hospital.beds} beds</span>
                    </p>
                    <div className="py-3 mt-4 border-t border-gray-100">
                      <p className="mb-2 text-sm font-semibold text-gray-600">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs text-yellow-700 bg-yellow-100 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <a
                        href={`https://www.google.com/maps?q=${hospital.location.lat},${hospital.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 text-center text-white transition-colors bg-yellow-600 rounded-lg hover:bg-yellow-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        Directions
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Hospital
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Type
                    </th>
                    {userLocation && (
                      <th
                        scope="col"
                        className="px-6 py-3 text -xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Distance
                      </th>
                    )}
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Emergency Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Beds
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Specialties
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHospitals.map((hospital, index) => (
                  <tr
                    key={index}
                    onClick={() => handleHospitalClick(hospital)}
                    className="transition-colors cursor-pointer hover:bg-yellow-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {hospital.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          hospital.type === "Government"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {hospital.type}
                      </span>
                    </td>
                    {userLocation && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            hospital.location.lat,
                            hospital.location.lng
                          ).toFixed(2)}{" "}
                          km
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {hospital.emergencyContact}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hospital.beds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs text-yellow-700 bg-yellow-100 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default HospitalDirectory;