import React, { useState } from 'react';
import { FaCalendarAlt, FaSyringe } from 'react-icons/fa';
import '../../../assets/css/Stats/editStatsPage/TransplantActivityInput.css';

// ✅ Import du token
import { getToken } from '../../Security&Auth/authUtils'; // Vérifie que le chemin est correct
import { API_BASE_URL } from '../../../config';

const TransplantActivityInput = ({ onSubmit }) => {
  const [year, setYear] = useState('');
  const [autografts, setAutografts] = useState('');
  const [allografts, setAllografts] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedYear = Math.floor(parseFloat(year) || 0);
      const parsedAutografts = Math.floor(parseFloat(autografts) || 0);
      const parsedAllografts = Math.floor(parseFloat(allografts) || 0);

      if (
        isNaN(parsedYear) ||
        isNaN(parsedAutografts) ||
        isNaN(parsedAllografts)
      ) {
        alert('Please enter valid numbers for all fields.');
        return;
      }

      const token = getToken(); // ✅ Récupération du token

      const response = await fetch(`${API_BASE_URL}/TransAct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // ✅ Envoi du token ici
        },
        body: JSON.stringify({
          year: parsedYear,
          nbAllographs: parsedAllografts,
          nbAutographs: parsedAutografts
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      alert('Submission is done successfully !');
      setYear('');
      setAutografts('');
      setAllografts('');

      if (onSubmit) {
        onSubmit(); // facultatif, peut rafraîchir les stats parent
      }

    } catch (err) {
      console.error('Submission error:', err.message);
      alert('Une erreur est survenue lors de la soumission.');
    }
  };

  return (
    <div className="transplant-activity-input">
      <h2>Transplant Activity Input</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year">
            <FaCalendarAlt className="icon" /> Year
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="autografts">
            <FaSyringe className="icon" /> Number of Autografts
          </label>
          <input
            type="number"
            id="autografts"
            value={autografts}
            onChange={(e) => setAutografts(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="allografts">
            <FaSyringe className="icon" /> Number of Allografts
          </label>
          <input
            type="number"
            id="allografts"
            value={allografts}
            onChange={(e) => setAllografts(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Transplant Data
        </button>
      </form>
    </div>
  );
};

export default TransplantActivityInput;
