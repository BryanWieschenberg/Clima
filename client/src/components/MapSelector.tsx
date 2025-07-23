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

const MapSelector: React.FC<MapSelectorProps> = ({ location, onLocationChange }) => {
  const [manualLocation, setManualLocation] = useState('');
  
  const handleMapClick = (e: React.MouseEvent) => {
    // In a real app, this would convert coordinates to a location
    const newLocation = {
      lat: location.lat + (Math.random() - 0.5) * 5,
      lng: location.lng + (Math.random() - 0.5) * 5,
      name: `Location ${Math.floor(Math.random() * 1000)}`
    };
    onLocationChange(newLocation);
  };
  
  const handleGeoLocate = () => {
    // Simulate geolocation
    const newLocation = {
      lat: 51.5074 + (Math.random() - 0.5) * 0.1,
      lng: -0.1278 + (Math.random() - 0.5) * 0.1,
      name: 'London'
    };
    onLocationChange(newLocation);
  };
  
  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      const newLocation = {
        lat: location.lat + (Math.random() - 0.5) * 10,
        lng: location.lng + (Math.random() - 0.5) * 10,
        name: manualLocation
      };
      onLocationChange(newLocation);
      setManualLocation('');
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
        
        <form onSubmit={handleManualLocationSubmit} className="manual-location">
          <input 
            type="text" 
            placeholder="Enter city or ZIP code" 
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MapSelector;
