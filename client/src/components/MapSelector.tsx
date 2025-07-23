import React, { useState } from 'react';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapSelectorProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

async function getLatLonFromCityState(city: string, state: string) {
    const query = `${city}, ${state}`;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        return { lat, lng: lon };
    } else {
        throw new Error("Location not found");
    }
}

const MapSelector: React.FC<MapSelectorProps> = ({ location, onLocationChange }) => {
  const [manualCity, setManualCity] = useState('');
  const [manualState, setManualState] = useState('');

  const handleMapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newLocation = {
      lat: location.lat + (Math.random() - 0.5) * 5,
      lng: location.lng + (Math.random() - 0.5) * 5,
      name: `Location ${Math.floor(Math.random() * 1000)}`
    };
    onLocationChange(newLocation);
  };
  
  const handleGeoLocate = () => {
    const newLocation = {
      lat: 51.5074 + (Math.random() - 0.5) * 0.1,
      lng: -0.1278 + (Math.random() - 0.5) * 0.1,
      name: 'London'
    };
    onLocationChange(newLocation);
  };
  
  const handleManualLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const { lat, lng } = await getLatLonFromCityState(manualCity, manualState);
        const newLocation = {
            lat,
            lng,
            name: `${manualCity}, ${manualState}`
        };
        onLocationChange(newLocation);
        setManualCity('');
        setManualState('');
    } catch (error) {
        alert('Location not found. Try again.');
    }
  };

  return (
    <div className="card map-selector">
      <div className="card-header">
        <h2 className="card-title">
          <i className="fa-solid fa-map-location-dot"></i>
          Location Selector
        </h2>
      </div>
      
      <div className="map-container" onClick={handleMapClick}>
        <div className="map-placeholder">
          <div className="map-marker" style={{ top: '45%', left: '55%' }}>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div className="map-overlay">Click anywhere to select location</div>
        </div>
      </div>
      
      <div className="location-controls">
        <button className="btn locate-btn" onClick={handleGeoLocate}>
          <i className="fa-solid fa-location-crosshairs"></i>
          Use My Current Location
        </button>
        
        <div className="or-divider">OR</div>
        
        <form 
          onSubmit={handleManualLocationSubmit} 
          className="manual-location flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 px-4 w-full"
        >
          <input 
            type="text"
            placeholder="City"
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
          />
          <input 
            type="text"
            placeholder="State/Country"
            value={manualState}
            onChange={(e) => setManualState(e.target.value)}
            required
            className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
          />
          <button 
            type="submit"
            className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition w-full sm:w-auto"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MapSelector;
