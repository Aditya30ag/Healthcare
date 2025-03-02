import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle getting and updating current location on the map
const LocationMarker = ({ setUserLocation }) => {
    const [position, setPosition] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const map = useMap();
  
    // Create a custom blue icon for the current location
    const blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  
    useEffect(() => {
      map.locate({ setView: true, maxZoom: 13 });
      
      map.on('locationfound', (e) => {
        setPosition(e.latlng);
        setAccuracy(e.accuracy);
        setUserLocation([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, 13);
      });
  
      map.on('locationerror', (e) => {
        console.error("Location access denied or unavailable:", e.message);
        alert("Could not access your location. Please check your location permissions.");
      });
  
      return () => {
        map.off('locationfound');
        map.off('locationerror');
      };
    }, [map, setUserLocation]);
  
    return position === null ? null : (
      <Marker position={position} icon={blueIcon}>
        <Popup>
          <div>
            <h3 className="font-bold">Your Location</h3>
            <p className="text-sm mt-1">Accuracy: ~{Math.round(accuracy)} meters</p>
          </div>
        </Popup>
      </Marker>
    );
};

const StyledMapContainer = ({ hospitals }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  
  // Find the center point of all hospital coordinates
  const getMapCenter = () => {
    const sumLat = hospitals.reduce((sum, hospital) => sum + hospital.location.lat, 0);
    const sumLng = hospitals.reduce((sum, hospital) => sum + hospital.location.lng, 0);
    return [sumLat / hospitals.length, sumLng / hospitals.length];
  };
  
  // Filter hospitals based on selected type
  const filteredHospitals = selectedType === "All" 
    ? hospitals 
    : hospitals.filter(hospital => hospital.type === selectedType);
    
  // Function to open Google Maps with specific coordinates
  const openGoogleMaps = (lat, lng, name) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  // Function to get directions from current location to hospital
  const getDirections = (destLat, destLng) => {
    if (!userLocation) {
      alert("Your location is not available. Please allow location access first.");
      return;
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${destLat},${destLng}&travelmode=driving`;
    window.open(url, '_blank');
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Delhi NCR Hospitals Map</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedType("All")}
            className={`px-3 py-1 rounded-md ${selectedType === "All" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedType("Government")}
            className={`px-3 py-1 rounded-md ${selectedType === "Government" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            Government
          </button>
          <button 
            onClick={() => setSelectedType("Private")}
            className={`px-3 py-1 rounded-md ${selectedType === "Private" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          >
            Private
          </button>
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg">
        <MapContainer
          center={getMapCenter()}
          zoom={11}
          style={{ height: '600px', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Current location marker */}
          <LocationMarker setUserLocation={setUserLocation} />
          
          {filteredHospitals.map((hospital, index) => (
            <Marker 
              key={index} 
              position={[hospital.location.lat, hospital.location.lng]}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-lg">{hospital.name}</h3>
                  <p className="text-sm">
                    <span className={`inline-block px-2 py-1 rounded text-white text-xs ${hospital.type === "Government" ? "bg-green-600" : "bg-purple-600"}`}>
                      {hospital.type}
                    </span>
                  </p>
                  <p className="mt-2"><strong>Emergency:</strong> {hospital.emergencyContact}</p>
                  <p><strong>Beds:</strong> {hospital.beds}</p>
                  <p><strong>Specialties:</strong> {hospital.specialties.join(", ")}</p>
                  <div className="flex flex-col mt-2 space-y-2">
                    <button 
                      onClick={() => openGoogleMaps(hospital.location.lat, hospital.location.lng, hospital.name)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Open in Google Maps
                    </button>
                    <button 
                      onClick={() => getDirections(hospital.location.lat, hospital.location.lng)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center"
                      disabled={!userLocation}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Get Directions
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <div className="absolute bottom-4 right-4 z-20 bg-white p-2 rounded-md shadow-md">
          <div className="flex flex-col space-y-1 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
              <span>Government ({hospitals.filter(h => h.type === "Government").length})</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
              <span>Private ({hospitals.filter(h => h.type === "Private").length})</span>
            </div>
            <div className="flex items-center mt-1 pt-1 border-t border-gray-200">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
              <span>Your Location</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        {userLocation ? 
          <span className="text-green-600">✓ Current location detected</span> : 
          <span className="text-orange-600">⚠ Waiting for location permission...</span>
        }
        <span className="ml-3">Showing {filteredHospitals.length} hospitals in Delhi NCR region</span>
      </div>
    </div>
  );
};

export default StyledMapContainer;