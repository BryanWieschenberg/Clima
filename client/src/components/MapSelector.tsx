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
  const [manualLat, setManualLat] = useState<number>(location.lat);
  const [manualLng, setManualLng] = useState<number>(location.lng);

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
    const newLocation = {
      lat: manualLat,
      lng: manualLng,
      name: manualLocation || `(${manualLat.toFixed(3)}, ${manualLng.toFixed(3)})`
    };
    
    onLocationChange(newLocation);
    setManualLocation('');
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
            type="number"
            step="any"
            placeholder="Latitude"
            value={manualLat}
            onChange={(e) => setManualLat(parseFloat(e.target.value))}
            required
          />
          <input 
            type="number"
            step="any"
            placeholder="Longitude"
            value={manualLng}
            onChange={(e) => setManualLng(parseFloat(e.target.value))}
            required
          />
          <input 
            type="text"
            placeholder="Location name (optional)"
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
