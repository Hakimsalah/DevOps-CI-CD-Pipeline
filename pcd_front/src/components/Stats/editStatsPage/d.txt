import React, { useState } from 'react';
import '../../../assets/css/Stats/editStatsPage/TransplantDiseasesInput.css';

const TransplantDiseasesInput = ({ onSubmit }) => {
  const [diseases, setDiseases] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [customDisease, setCustomDisease] = useState('');
  const [percentage, setPercentage] = useState('');
  const [error, setError] = useState('');

  const predefinedDiseases = ['LH', 'LNH', 'MM', 'LA', 'LMC', 'AMA', 'SMD'];

  // Calculate the total percentage of all added diseases
  const totalPercentage = diseases.reduce((sum, d) => sum + d.percentage, 0);

  const handleAdd = () => {
    // Validation: Ensure a disease is selected
    if (!selectedOption) {
      setError('Please select a disease');
      return;
    }

    // Determine the disease name
    let diseaseName = selectedOption;
    if (selectedOption === 'other') {
      if (!customDisease.trim()) {
        setError('Please enter a custom disease name');
        return;
      }
      diseaseName = customDisease.trim();
    }

    // Validate and parse the percentage
    const perc = parseFloat(percentage);
    if (isNaN(perc) || perc < 0 || perc > 100) {
      setError('Please enter a valid percentage between 0 and 100');
      return;
    }

    // Check if adding this percentage would exceed 100%
    if (totalPercentage + perc > 100) {
      setError('Adding this percentage would make the total exceed 100%');
      return;
    }

    // Add the new disease to the list and reset the form
    setDiseases([...diseases, { disease: diseaseName, percentage: perc }]);
    setSelectedOption('');
    setCustomDisease('');
    setPercentage('');
    setError('');
  };

  const handleRemove = (index) => {
    // Remove the disease at the specified index
    setDiseases(diseases.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Pass the list of diseases to the parent component
    onSubmit(diseases);
  };

  return (
    <div className="transplant-diseases-input">
      <h2>Diseases Covered by Transplantation</h2>

      <div className="form-group">
        <label>Disease:</label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select a disease</option>
          {predefinedDiseases.map((disease) => (
            <option key={disease} value={disease}>
              {disease}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </div>

      {selectedOption === 'other' && (
        <div className="form-group">
          <label>Custom Disease:</label>
          <input
            type="text"
            value={customDisease}
            onChange={(e) => setCustomDisease(e.target.value)}
            placeholder="Enter disease name"
          />
        </div>
      )}

      <div className="form-group">
        <label>Percentage:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button  className= 'my-button-transplantDiseaseInput'onClick={handleAdd}>Add Disease</button>

      <div className="diseases-list">
        {diseases.map((d, index) => (
          <div key={index} className="disease-item">
            <span>
              {d.disease}: {d.percentage}%
            </span>
            <button  className= 'my-button-transplantDiseaseInput' onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>

      <p>Total Percentage: {totalPercentage.toFixed(2)}%</p>

      <button className= 'my-button-transplantDiseaseInput' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TransplantDiseasesInput;