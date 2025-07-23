// src/components/WeeklyPlanner.tsx
import React from 'react';

interface WeeklyData {
  day: string;
  high: number;
  low: number;
  condition: string;
  recommendation?: string;
  layers?: { type: string; name: string }[];
}

interface WeeklyPlannerProps {
  weeklyData: WeeklyData[];
  activeTab: 'today' | 'weekly';
  setActiveTab: (tab: 'today' | 'weekly') => void;
}

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ weeklyData, activeTab, setActiveTab }) => {
  return (
    <div className="card weekly-planner">
      <div className="card-header">
        <h2 className="card-title">
          <i className="fa-solid fa-calendar-days"></i>
          Weekly Planner
        </h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Today's Details
          </button>
          <button 
            className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly Forecast
          </button>
        </div>
      </div>
      
      <div className="weekly-content">
        {activeTab === 'today' ? (
          <div className="day-details">
            <h3>Detailed Outfit Planning</h3>
            <div className="time-slots">
              <div className="time-slot">
                <div className="time">Morning (6-9 AM)</div>
                <div className="recommendation">Light jacket over t-shirt</div>
              </div>
              <div className="time-slot">
                <div className="time">Day (9 AM - 4 PM)</div>
                <div className="recommendation">T-shirt only, sunglasses recommended</div>
              </div>
              <div className="time-slot">
                <div className="time">Evening (4-8 PM)</div>
                <div className="recommendation">Light jacket again as temperature drops</div>
              </div>
            </div>
            
            <div className="additional-tips">
              <h4>Additional Tips</h4>
              <ul>
                <li>UV index will be high between 11 AM - 3 PM</li>
                <li>Light breeze expected in the afternoon</li>
                <li>Humidity may make it feel warmer than actual temperature</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="weekly-forecast">
            {weeklyData.map((day, index) => (
              <div className="day-card" key={index}>
                <div className="day-header">
                  <div className="day-name">{day.day}</div>
                  <div className="temp-range">
                    <span className="high">{day.high}°</span>
                    <span className="low">/{day.low}°</span>
                  </div>
                </div>
                <div className="day-condition">{day.condition}</div>
                <div className="day-recommendation">
                  <i className="fa-solid fa-shirt"></i>
                  {day.recommendation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlanner;
