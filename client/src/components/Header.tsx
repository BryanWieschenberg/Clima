import React from 'react';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  location: Location;
  onGenerate: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, location, onGenerate }) => {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">
          <i className="fa-solid fa-shirt"></i>
        </div>
        <h1>Clima</h1>
      </div>
      
      <div className="location-info">
        <i className="fa-solid fa-location-dot"></i>
        <span>{location.name}</span>
      </div>
      
      <div className="header-controls">
        <button 
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} 
          onClick={toggleDarkMode}
        >
          {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
        </button>
        
        <button className="btn generate-btn" onClick={onGenerate}>
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          Generate Recommendation
        </button>
      </div>
    </header>
  );
};

export default Header;
