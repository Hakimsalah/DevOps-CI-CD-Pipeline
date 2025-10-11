import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../../../assets/css/Stats/Hygiene/selectionBarEditor.css';
import { getToken } from '../../Security&Auth/authUtils'; // Adjust path if needed
import { API_BASE_URL } from '../../../config';


const DisinfectantEditor = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    disinfectant: '',
    service: '',
    surface: '',
    quantity: '',
    year: '',
  });
  const [deleteYear, setDeleteYear] = useState('');

  const disinfectantOptions = ['Bleach', 'Alcohol', 'Hydrogen Peroxide'];

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}/disinfectants`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching disinfectants:', error);
      }
    };
    fetchEntries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    const { disinfectant, service, surface, quantity, year } = formData;
    
    if (!disinfectant || !quantity || !year) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEntry = {
      disinfectant,
      service,
      surface,
      quantity: parseFloat(quantity),
      year: parseInt(year),
    };

    try {
      const token = getToken();
      const response = await axios.post(`${API_BASE_URL}/utilizations/add`, newEntry, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries((prev) => [...prev, response.data]);
      setFormData({ disinfectant: '', service: '', surface: '', quantity: '', year: '' });
      alert('Entry added successfully!');
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add entry.');
    }
  };

  const handleDelete = async () => {
    if (!deleteYear) {
      alert('Please select a year to delete.');
      return;
    }

    try {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/utilizations/delete/${deleteYear}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries((prev) => prev.filter((entry) => entry.year !== parseInt(deleteYear)));
      setDeleteYear('');
      alert('Entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry.');
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="disinfectant-editor">
      <h1 className="editor-title">Disinfectant Management</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          name="disinfectant"
          value={formData.disinfectant}
          onChange={handleInputChange}
          placeholder="Enter Disinfectant"
          className="input-field"
        />

        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          placeholder="Enter Service"
          className="input-field"
        />

        <input
          type="text"
          name="surface"
          value={formData.surface}
          onChange={handleInputChange}
          placeholder="Enter Surface"
          className="input-field"
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Enter Quantity"
          className="input-field"
          min="0"
          step="0.1"
        />

        <select
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="">Select Year</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button className="action-button add-button" onClick={handleAdd}>
          <FaPlus /> Add
        </button>
      </div>

      {/* Delete Section */}
      <div className="delete-section">
        <select
          value={deleteYear}
          onChange={(e) => setDeleteYear(e.target.value)}
          className="input-field"
        >
          <option value="">Select Year to delete</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button className="action-button add-button" onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>

      {/* Entries List */}
      <div className="entries-list">
        {entries.length === 0 ? (
          <p className="no-entries">No entries found.</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="entry-item">
              <span>
                {entry.disinfectant} - {entry.service && `${entry.service} - `}
                {entry.surface && `${entry.surface} - `}
                {entry.quantity} units - {entry.year}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisinfectantEditor;
