import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../assets/css/Stats/DiseaseOverview/diseaseOverview.css";
import SelectionBar from "./selectionBar";
import Footer from '../../footer/footer';
import ChatBot from "../../ChatBot/ChatBot";
import { API_BASE_URL} from '../../../config';

// ✅ Import du token
import { getToken } from "../../Security&Auth/authUtils"; // Assure-toi que ce chemin est correct

const Hygiene = () => {
  const [Germs, setGerms] = useState([]);

  useEffect(() => {
    const fetchGerms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/germs`);
  
        setGerms(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des germes :", error);
      }
    };
  
    fetchGerms();
  }, []);
  

  return (
    <div className="disease-overview-container ">
      <div className="selectionBar-class mt-[150px]">
        <div className="section-title">
          Visualiser les graphiques des germes et des désinfectants
        </div>
        <SelectionBar />
      </div>

      <h1 className="section-title">Aperçu des germes</h1>
      <p className="section-subtitle">
        Explorer les différents germes rencontrés au Centre de transplantation de moelle osseuse.
      </p>

      {Germs.map((germ, index) => (
        <div
          key={index}
          className={`disease-section ${index % 2 === 0 ? 'left' : 'right'}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="disease-content">
            <img
              src={`data:image/png;base64,${germ.image}`}
              alt={`${germ.name} illustration`}
              className="disease-image"
            />
            <div className="disease-info">
              <h2 className="disease-name">{germ.name}</h2>
              <p className="disease-description">{germ.description}</p>
            </div>
          </div>
        </div>
      ))}

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Hygiene;
