import { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import OutfitRecommendation from './components/OutfitRecommendation';
import WeeklyPlanner from './components/WeeklyPlanner';
import MapSelector from './components/MapSelector';
import Preferences from './components/Preferences';
import './App.css';

// Type definitions
interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  wind: number;
  hourly?: { time: string; temp: number; condition: string }[];
}

interface OutfitLayer {
  type: string;
  name: string;
  description?: string;
}

interface OutfitRecommendationData {
  confidence: number;
  recommendation: string;
  layers: OutfitLayer[];
}

interface WeeklyData {
  day: string;
  high: number;
  low: number;
  condition: string;
  recommendation?: string;
  layers?: OutfitLayer[];
}

interface Preferences {
  budget: 'low' | 'medium' | 'high';
  avoidMaterials: string[];
  style: 'casual' | 'business' | 'athletic' | 'smart';
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState<Location>({ lat: 40.7128, lng: -74.0060, name: 'New York' });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [outfitData, setOutfitData] = useState<OutfitRecommendationData | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    budget: 'medium',
    avoidMaterials: [],
    style: 'casual'
  });
  const [activeTab, setActiveTab] = useState<'today' | 'weekly'>('today');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock weather data - in a real app, this would come from an API
  const mockWeatherData: WeatherData = {
    temp: 22,
    feelsLike: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    hourly: [
      { time: '6 AM', temp: 18, condition: 'Clear' },
      { time: '9 AM', temp: 21, condition: 'Partly Cloudy' },
      { time: '12 PM', temp: 25, condition: 'Sunny' },
      { time: '3 PM', temp: 26, condition: 'Sunny' },
      { time: '6 PM', temp: 23, condition: 'Partly Cloudy' },
    ]
  };

  // Mock outfit recommendations
  const mockOutfitData: OutfitRecommendationData = {
    confidence: 92,
    recommendation: "Light jacket with jeans and a t-shirt",
    layers: [
      { type: 'top', name: 'Cotton T-shirt', description: 'Light and breathable' },
      { type: 'outerwear', name: 'Denim Jacket', description: 'Light layer for breezy weather' },
      { type: 'bottom', name: 'Comfortable Jeans', description: 'Classic choice for mild weather' },
      { type: 'footwear', name: 'Sneakers', description: 'Comfortable for walking' },
      { type: 'accessory', name: 'Sunglasses', description: 'UV protection for sunny periods' },
    ]
  };

  // Mock weekly data
  const mockWeeklyData: WeeklyData[] = [
    { day: 'Mon', high: 24, low: 17, condition: 'Sunny', recommendation: "T-shirt and shorts" },
    { day: 'Tue', high: 26, low: 19, condition: 'Sunny', recommendation: "Tank top with shorts" },
    { day: 'Wed', high: 23, low: 18, condition: 'Cloudy', recommendation: "Long sleeve shirt and jeans" },
    { day: 'Thu', high: 20, low: 16, condition: 'Rain', recommendation: "Waterproof jacket with trousers" },
    { day: 'Fri', high: 22, low: 17, condition: 'Partly Cloudy', recommendation: "Sweater with chinos" },
    { day: 'Sat', high: 25, low: 19, condition: 'Sunny', recommendation: "Polo shirt and shorts" },
    { day: 'Sun', high: 27, low: 20, condition: 'Sunny', recommendation: "T-shirt and light pants" },
  ];

  useEffect(() => {
    // Simulate API call to get weather and outfit data
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setOutfitData(mockOutfitData);
      setIsLoading(false);
    }, 800);
  }, [location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLocationChange = (newLocation: Location) => {
    setIsLoading(true);
    setLocation(newLocation);
  };

  const handlePreferencesChange = (newPreferences: Preferences) => {
    setPreferences(newPreferences);
    // In a real app, we'd recalculate recommendations
  };

  const handleGenerateRecommendation = () => {
    setIsLoading(true);
    // Simulate generating new recommendation
    setTimeout(() => {
      const newRecommendation = { ...mockOutfitData };
      setOutfitData(newRecommendation);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        location={location}
        onGenerate={handleGenerateRecommendation}
      />
      
      <main className="container">
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <WeatherCard 
              weatherData={weatherData} 
              location={location}
              isLoading={isLoading}
            />
            
            <OutfitRecommendation 
              outfitData={outfitData}
              isLoading={isLoading}
            />
          </div>
          
          <div className="dashboard-right">
            <MapSelector 
              location={location}
              onLocationChange={handleLocationChange}
            />
            
            <Preferences 
              preferences={preferences}
              onPreferencesChange={handlePreferencesChange}
            />
          </div>
        </div>
        
        <WeeklyPlanner 
          weeklyData={mockWeeklyData} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </main>
      
      <footer className="footer">
        <p>Clima &copy; {new Date().getFullYear()} | Privacy-First AI Clothing Assistant</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Feedback</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
