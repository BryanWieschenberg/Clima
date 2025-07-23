// src/components/Preferences.tsx
import React, { useState } from 'react';

interface UserPreferences {
  budget: 'low' | 'medium' | 'high';
  avoidMaterials: string[];
  style: 'casual' | 'business' | 'athletic' | 'smart';
}

interface PreferencesProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ preferences, onPreferencesChange }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleMaterial = (material: string) => {
    const newMaterials = preferences.avoidMaterials.includes(material)
      ? preferences.avoidMaterials.filter(m => m !== material)
      : [...preferences.avoidMaterials, material];
      
    onPreferencesChange({
      ...preferences,
      avoidMaterials: newMaterials
    });
  };
  
  return (
    <div className={`card preferences ${expanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <h2 className="card-title">
          <i className="fa-solid fa-sliders"></i>
          Clothing Preferences
        </h2>
        <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </div>
      
      {expanded && (
        <div className="preferences-content">
          <div className="preference-group">
            <h3>Budget</h3>
            <div className="budget-options">
              {(['low', 'medium', 'high'] as const).map(option => (
                <button
                  key={option}
                  className={`budget-option ${preferences.budget === option ? 'active' : ''}`}
                  onClick={() => onPreferencesChange({...preferences, budget: option})}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="preference-group">
            <h3>Style Preference</h3>
            <div className="style-options">
              {(['casual', 'business', 'athletic', 'smart'] as const).map(option => (
                <button
                  key={option}
                  className={`style-option ${preferences.style === option ? 'active' : ''}`}
                  onClick={() => onPreferencesChange({...preferences, style: option})}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="preference-group">
            <h3>Materials to Avoid</h3>
            <div className="material-options">
              {['Wool', 'Leather', 'Polyester', 'Denim', 'Silk'].map(material => (
                <div
                  key={material}
                  className={`material-option ${preferences.avoidMaterials.includes(material) ? 'active' : ''}`}
                  onClick={() => toggleMaterial(material)}
                >
                  {material}
                </div>
              ))}
            </div>
          </div>
          
          <div className="privacy-note">
            <i className="fa-solid fa-lock"></i>
            Your preferences are stored locally on your device and never shared
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
