import React, { useState } from 'react';
import '../../assets/css/ai/rec.css';

import ChatBot from '../ChatBot/ChatBot';
import Footer from '../footer/footer';
import { API_BASE_URL_AI } from '../../config';


// Function to fetch recommendations from backend
const fetchRecommendations = async (date, surface, service, chambre, element) => {
  console.log("Calling Flask AI:✅✅✅", API_BASE_URL_AI);     // ✅ Debug line
  const response = await fetch(`${API_BASE_URL_AI}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: [date, surface, service, chambre, element] }),
  });

  if (!response.ok) {
    throw new Error('Échec de la récupération des recommandations.');
  }

  const data = await response.json();
  return {
    germs: Object.entries(data.germs).map(([name, count]) => ({ name, count })),
    disinfectants: Object.entries(data.disinfectants).map(([name, volume]) => ({
      name,
      volume: Math.round(volume * 1000), // Scale to mL
    })),
  };
};

const AIRecommendation = () => {
  const [formData, setFormData] = useState({
    service: 'pédiatrie',
    surface: 'surface',
    chambre: 'cabine1',
    element: 'chaise',
    date: '',
  });
  const [results, setResults] = useState({ germs: [], disinfectants: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults({ germs: [], disinfectants: [] });

    try {
      const data = await fetchRecommendations(
        formData.date,
        formData.surface,
        formData.service,
        formData.chambre,
        formData.element
      );

      // Logging the recommendations for debugging/audit
      console.group('AI Recommendations');
      console.log('Input:', formData);
      console.group('Germs Predicted');
      data.germs.forEach((g) => console.log(`${g.name}: ${g.count.toFixed(2)}`));
      console.groupEnd();
      console.group('Disinfectants Recommended');
      data.disinfectants.forEach((d) => console.log(`${d.name}: ${d.volume} mL`));
      console.groupEnd();
      console.groupEnd();

      setResults(data);
    } catch (err) {
      setError('Échec de la récupération des recommandations. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="ai-recommendation-container">
        <h2 className="ai-recommendation-title mt-[25px]">Recommandation de Désinfectant par IA</h2>
        <div className="ai-recommendation-content">
          <form className="ai-recommendation-form" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="form-group">
              <label htmlFor="date">Date :</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="surface">Surface :</label>
              <select id="surface" name="surface" value={formData.surface} onChange={handleInputChange}>
                <option value="surface" disabled>surface</option>
                <option value="lavabo">lavabo</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="service">Service :</label>
              <select id="service" name="service" value={formData.service} onChange={handleInputChange}>
                <option value="pédiatrie">pédiatrie</option>
                <option value="adulte">adulte</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="chambre">Chambre :</label>
              <select id="chambre" name="chambre" value={formData.chambre} onChange={handleInputChange}>
                {[
                  'cabine1','cabine2','cabine3','cabine4','cabine5','cabine6','cabine7','cabine8','cabine9','cabine10','cabine11','cabine12',
                  'chambre1','chambre2','chambre3','chambre4','chambre5','chambre8','chambre9','chambre10','chambre11','chambre12',
                  'chambreabidjan','chambrebagdad','chambrecotono','chambredakar','chambrekhorthoume','chambrekods','chambrekonakri',
                  'chambrelondon','chambrelyma','chambremoscou','chambreniami','chambreparis','chambrepikine','chambretrabelsi','chambretunis'
                ].map((room) => <option key={room} value={room}>{room}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="element">Élément à nettoyer :</label>
              <select id="element" name="element" value={formData.element} onChange={handleInputChange}>
                {[
                  'chaise','chaise percée','dessus éclairage','interphone','lavabo','lit','matelas','mur','oreiller',
                  'poignée de porte','potence','table de lit','table de nuit','élément'
                ].map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <button type="submit" className="recommend-button" disabled={isLoading}>
              {isLoading ? 'Chargement...' : 'Obtenir des recommandations'}
            </button>
          </form>

          {isLoading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Génération des résultats...</p>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          {!isLoading && results.germs.length > 0 && (
            <div className="germ-results">
              <h3>Germes prédits</h3>
              <ul className="germ-list">
                {results.germs.map((germ, index) => (
                  <li key={germ.name} className={`germ-item rank-${index + 1}`}>
                    <span className="rank-badge">{index + 1}</span>
                    <div className="germ-details">
                      <span className="germ-name">{germ.name}</span>
                      <span className="count">Compte : {germ.count.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isLoading && results.disinfectants.length > 0 && (
            <div className="recommendation-results">
              <h3>Désinfectants recommandés</h3>
              <ul className="disinfectant-list">
                {results.disinfectants.map((disinfectant, index) => (
                  <li key={disinfectant.name} className={`disinfectant-item rank-${index + 1}`}>
                    <span className="rank-badge">{index + 1}</span>
                    <div className="disinfectant-details">
                      <span className="disinfectant-name">{disinfectant.name}</span>
                      <span className="volume">Volume : {disinfectant.volume} mL</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <ChatBot />
      </div>
      <Footer />
    </>
  );
};

export default AIRecommendation;
