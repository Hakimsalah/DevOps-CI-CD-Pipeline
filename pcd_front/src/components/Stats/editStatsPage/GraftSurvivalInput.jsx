import React, { useState } from 'react';
import { FaSyringe, FaVirus, FaPercent } from 'react-icons/fa';
import '../../../assets/css/Stats/editStatsPage/GraftSurvivalInput.css';

const GraftSurvivalInput = ({ onSubmit }) => {
  const [graftType, setGraftType] = useState('');
  const [disease, setDisease] = useState('');
  const [customDisease, setCustomDisease] = useState('');
  const [survivalRate, setSurvivalRate] = useState('');
  const [error, setError] = useState('');

  const diseases = [
    'Aplasie médullaire',
    'Leucémie aigue',
    'Myolème multiple',
    'Lymphome',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!graftType) {
      setError('Please select a graft type');
      return;
    }
    if (!disease) {
      setError('Please select a disease');
      return;
    }
    if (disease === 'Other' && !customDisease.trim()) {
      setError('Please enter a custom disease name');
      return;
    }
    const rate = parseFloat(survivalRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError('Please enter a valid survival rate between 0 and 100');
      return;
    }

    // Prepare data
    const data = {
      graftType,
      disease: disease === 'Other' ? customDisease.trim() : disease,
      survivalRate: rate
    };

    // Pass data to parent and reset form
    onSubmit(data);
    setGraftType('');
    setDisease('');
    setCustomDisease('');
    setSurvivalRate('');
  };

  return (
    <div className="graft-survival-input">
      <h2>Graft and Survival Data Input</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="graftType">
            <FaSyringe className="icon" /> Graft Type
          </label>
          <select
            id="graftType"
            value={graftType}
            onChange={(e) => setGraftType(e.target.value)}
          >
            <option value="">Select graft type</option>
            <option value="Allograft">Allograft</option>
            <option value="Autograft">Autograft</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="disease">
            <FaVirus className="icon" /> Disease
          </label>
          <select
            id="disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          >
            <option value="">Select disease</option>
            {diseases.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {disease === 'Other' && (
          <div className="form-group">
            <label htmlFor="customDisease">Custom Disease</label>
            <input
              type="text"
              id="customDisease"
              value={customDisease}
              onChange={(e) => setCustomDisease(e.target.value)}
              placeholder="Enter disease name"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="survivalRate">
            <FaPercent className="icon" /> Survival Rate after 5 Years (%)
          </label>
          <input
            type="number"
            id="survivalRate"
            value={survivalRate}
            onChange={(e) => setSurvivalRate(e.target.value)}
            min="0"
            max="100"
            step="0.1"
            placeholder="Enter percentage"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GraftSurvivalInput;