import React, { useState, useEffect } from 'react'; // Added useEffect import
import axios from 'axios'; // Added axios import
import "../../../assets/css/Stats/DiseaseOverview/diseaseOverview.css";
import lymphoma from '../../../assets/images/Stats/DiseaseOverview/lymphoma.jpg';
import leukemia from '../../../assets/images/Stats/DiseaseOverview/leukemia.jpg';
import anemia from '../../../assets/images/Stats/DiseaseOverview/anemia.jpg';
import myeloma from '../../../assets/images/Stats/DiseaseOverview/myoleme.jpg';
import Footer from '../../footer/footer';
import ChatBot from "../../ChatBot/ChatBot";
import { API_BASE_URL } from '../../../config';


const DiseaseOverview = () => {

  const [diseases, setDiseases] = useState([]);

  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    return { Authorization: `Bearer ${token}` };
  };
    
  // Fetch diseases on component mount
// Fetch diseases on component mount
useEffect(() => {
  axios.get(`${API_BASE_URL/diseases}`)
    .then(response => setDiseases(response.data))
    .catch(error => console.error("Error fetching diseases:", error));
}, []);



  return (
    <div className="disease-overview-container ">
      
      <h1 className="section-title mt-[150px]">Aperçu des Maladies</h1>
      <p className="section-subtitle">
        Explorez les pathologies que nous traitons au Centre de Transplantation de Moelle Osseuse.
      </p>

      {diseases.map((disease, index) => (
        <div
          key={index}
          className={`disease-section ${index % 2 === 0 ? 'left' : 'right'}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="disease-content">
            <img
            src={`data:image/png;base64,${disease.image}`}
            alt={`${disease.name} illustration`}
            className="disease-image"
            />
            <div className="disease-info">
              <h2 className="disease-name">{disease.name}</h2>
              <p className="disease-description">{disease.description}</p>
            </div>
          </div>
        </div>
      ))}
      <ChatBot/>
    <Footer/>
    </div>
  );
};

export default DiseaseOverview;