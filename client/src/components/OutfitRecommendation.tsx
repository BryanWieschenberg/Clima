// src/components/OutfitRecommendation.tsx
import React from 'react';

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

interface OutfitRecommendationProps {
  outfitData: OutfitRecommendationData | null;
  isLoading: boolean;
}

const OutfitRecommendation: React.FC<OutfitRecommendationProps> = ({ outfitData, isLoading }) => {
  if (isLoading || !outfitData) {
    return (
      <div className="card outfit-card loading">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fa-solid fa-shirt"></i>
            Outfit Recommendation
          </h2>
          <div className="spinner"></div>
        </div>
        <div className="loading-content">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  const getLayerIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'top': return 'fa-tshirt';
      case 'outerwear': return 'fa-coat';
      case 'bottom': return 'fa-pants';
      case 'footwear': return 'fa-shoe-prints';
      case 'accessory': return 'fa-glasses';
      default: return 'fa-shirt';
    }
  };

  return (
    <div className="card outfit-card">
      <div className="card-header">
        <h2 className="card-title">
          <i className="fa-solid fa-shirt"></i>
          Outfit Recommendation
        </h2>
        <div className="confidence-badge">
          <i className="fa-solid fa-brain"></i>
          AI Confidence: {outfitData.confidence}%
        </div>
      </div>
      
      <div className="outfit-summary">
        <i className="fa-solid fa-lightbulb"></i>
        <p>{outfitData.recommendation}</p>
      </div>
      
      <div className="outfit-layers">
        <h3>Recommended Layers</h3>
        <div className="layers-grid">
          {outfitData.layers.map((layer, index) => (
            <div className="layer-card" key={index}>
              <div className="layer-icon">
                <i className={`fa-solid ${getLayerIcon(layer.type)}`}></i>
              </div>
              <div className="layer-info">
                <div className="layer-type">{layer.type}</div>
                <div className="layer-name">{layer.name}</div>
                {layer.description && (
                  <div className="layer-description">{layer.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="outfit-actions">
        <button className="btn">
          <i className="fa-solid fa-thumbs-up"></i>
          Like this outfit
        </button>
        <button className="btn btn-outline">
          <i className="fa-solid fa-rotate"></i>
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default OutfitRecommendation;
