import React, { useEffect, useState } from 'react';
import '../../../assets/css/Stats/editStatsPage/TransplantDiseasesInput.css';
import { getToken } from '../../Security&Auth/authUtils'; // Ajuste le chemin selon ta structure
import { API_BASE_URL } from '../../../config';
const TransplantDiseasesInput = ({ onSubmit }) => {
  const [diseasesList, setDiseasesList] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [error, setError] = useState('');
  const [disease, setDisease] = useState({
    disease: "",
    acronym: "",
    percentage: 0
  });

  useEffect(() => {
    console.log("Diseases List After Addition / Removal:", diseasesList);
  }, [diseasesList]);

  const handleDisease = (field, value) => {
    setDisease((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    const perc = parseFloat(disease.percentage);
    if (isNaN(perc) || perc <= 0 || perc > 100) {
      setError('Please enter a valid percentage between 0 and 100');
      return;
    }

    if (totalPercentage + perc > 100) {
      setError('Adding this percentage would make the total exceed 100%');
      return;
    }

    setDiseasesList([...diseasesList, { ...disease, percentage: perc }]);
    setTotalPercentage(totalPercentage + perc);
    setDisease({ disease: "", acronym: "", percentage: 0 });
    setError('');
  };

  const handleRemove = (index) => {
    const removed = diseasesList[index];
    setDiseasesList(diseasesList.filter((_, i) => i !== index));
    setTotalPercentage(totalPercentage - removed.percentage);
  };

  const handleSubmit = async () => {
    if (totalPercentage !== 100) {
      alert("The total percentage must be exactly 100%.");
      return;
    }

    try {
      const token = getToken();
      if (!token) throw new Error("Token manquant. Veuillez vous reconnecter.");

      const response = await fetch(`${API_BASE_URL}/MaladiePriseEnCharge/batch`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(diseasesList),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission des données.");
      }

      alert("Submission done with success!");
      setDiseasesList([]);
      setTotalPercentage(0);
      setDisease({ disease: "", acronym: "", percentage: 0 });
      if (onSubmit) onSubmit();

    } catch (err) {
      console.error(err.message);
      alert("Erreur : " + err.message + ". Vous avez peut-être des doublons.");
    }
  };

  return (
    <div className="transplant-diseases-input">
      <h2>Diseases Covered by Transplantation</h2>

      <div className="form-group">
        <label>Disease:</label>
        <input
          type="text"
          value={disease.disease}
          onChange={(e) => handleDisease("disease", e.target.value)}
          placeholder="Enter disease name"
        />
      </div>

      <div className="form-group">
        <label>Disease Acronym:</label>
        <input
          type="text"
          value={disease.acronym}
          onChange={(e) => handleDisease("acronym", e.target.value)}
          placeholder="Enter disease acronym"
        />
      </div>

      <div className="form-group">
        <label>Percentage:</label>
        <input
          type="number"
          value={disease.percentage}
          step="0.01"
          min="0"
          max="100"
          onChange={(e) => handleDisease("percentage", e.target.value)}
          placeholder="Enter percentage"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button className="my-button-transplantDiseaseInput" onClick={handleAdd}>
        Add Disease
      </button>

      <div className="diseases-list">
        {diseasesList.map((d, index) => (
          <div key={index} className="disease-item">
            <span>{d.disease}: {d.acronym}: {d.percentage}%</span>
            <button
              className="my-button-transplantDiseaseInput"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <p>Total Percentage: {totalPercentage.toFixed(2)}%</p>

      <button className="my-button-transplantDiseaseInput" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TransplantDiseasesInput;
