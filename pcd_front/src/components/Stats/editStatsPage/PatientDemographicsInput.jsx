import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import '../../../assets/css/Stats/editStatsPage/PatientDemographicsInput.css';
import { getToken } from '../../Security&Auth/authUtils'; // Adapte le chemin si nécessaire
import { API_BASE_URL } from '../../../config';

const PatientDemographicsInput = ({ onSubmit }) => {
  const [demographics, setDemographics] = useState({
    '0-18': '',
    '19-30': '',
    '31-45': '',
    '46-60': '',
    '61+': '',
    description: ''
  });

  const keyMap = {
    category1: '0-18',
    category2: '19-30',
    category3: '31-45',
    category4: '46-60',
    category5: '61+',
    description: 'description'
  };

  const handleInputChange = (group, value) => {
    setDemographics((prev) => ({
      ...prev,
      [group]: value
    }));
  };

  const BacktoDb = (data) => {
    const dataToSend = {};
    Object.entries(keyMap).forEach(([dbKey, stateKey]) => {
      dataToSend[dbKey] = data[stateKey];
    });
    return dataToSend;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      if (!token) throw new Error("Token manquant. Veuillez vous reconnecter.");

      const response = await fetch(`${API_BASE_URL}/patientDemographics`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(BacktoDb(demographics))
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour des données");
      }

      alert("Demographics updated successfully!");
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error(err.message);
      alert("Erreur lors de la mise à jour : " + err.message);
    }
  };

  useEffect(() => {
    const getDemographics = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error("Token manquant pour la récupération des données.");

        const response = await fetch(`${API_BASE_URL}/patientDemographics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        const mappedData = {};
        Object.entries(keyMap).forEach(([dbKey, stateKey]) => {
          mappedData[stateKey] = data[0][dbKey];
        });
        setDemographics(mappedData);
      } catch (err) {
        console.error(err.message);
        alert("Erreur de chargement des données : " + err.message);
      }
    };

    getDemographics();
  }, []);

  const ageGroups = ['0-18', '19-30', '31-45', '46-60', '61+', 'description'];

  return (
    <div className="patient-demographics-input">
      <h2>Patient Demographics by Age</h2>
      <form onSubmit={handleSubmit}>
        {ageGroups.map((group) => (
          <div className="form-group" key={group}>
            <label htmlFor={group}>
              <FaUsers className="icon" /> {group}
            </label>

            {group !== "description" ? (
              <input
                type="number"
                id={group}
                value={demographics[group]}
                onChange={(e) => handleInputChange(group, e.target.value)}
                min="0"
                step="1"
                placeholder="Enter number"
              />
            ) : (
              <textarea
                id="description"
                value={demographics.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter description"
                rows="4"
                cols="50"
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Update Demographics
        </button>
      </form>
    </div>
  );
};

export default PatientDemographicsInput;
