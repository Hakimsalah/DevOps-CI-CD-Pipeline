import React, { useState, useEffect } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import '../../../assets/css/Stats/editStatsPage/DiseaseEditor.css';
import { API_BASE_URL } from '../../../config';
const DiseaseEditor = () => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL/diseases}`)
      .then(response => setDiseases(response.data))
      .catch(error => console.error("Error fetching diseases:", error));
  }, []);

  const handleInputChange = async (id, field, value) => {
    if (!id) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/diseases/update/${id}/${field}`, value, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setDiseases(
          diseases.map((disease) =>
            disease.id === id ? { ...disease, [field]: value } : disease
          )
        );
      }
    } catch (error) {
      console.error('Update error:', error.message);
      alert('Error updating disease: ' + error.message);
    }
  };

  const handleImageUpload = async (diseaseId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE_URL}/diseases/update/image/${diseaseId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        const updatedResponse = await axios.get(`${API_BASE_URL}/diseases`);
        setDiseases(updatedResponse.data);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/diseases/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete disease");

      setDiseases(diseases.filter((disease) => disease.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  const handleAddDisease = async () => {
    try {
      const newDisease = {
        name: "",
        description: "",
        image: null
      };

      const response = await axios.post(`${API_BASE_URL}/diseases/add`, newDisease, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data) {
        setDiseases([...diseases, response.data]);
      } else {
        throw new Error("Failed to add disease");
      }
    } catch (error) {
      console.error("Add disease error:", error.message);
      alert("Error adding new disease: " + error.message);
    }
  };

  

  return (
    <div className="disease-editor">
      <h1>Edit Diseases</h1>

      {diseases.map((disease) => (
        <div key={disease.id} className="disease-container">
          <div className="image-section">
            <img 
              src={disease.image ? `data:image/jpeg;base64,${disease.image}` : ''} 
              alt={disease.name} 
            />
            <label className="upload-button">
              <FaUpload /> Upload New
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(disease.id, e)}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div className="input-section">
            <input
              type="text"
              value={disease.name || ''}
              onChange={(e) => handleInputChange(disease.id, 'name', e.target.value)}
              placeholder="Disease Name"
            />
            <textarea
              value={disease.description || ''}
              onChange={(e) => handleInputChange(disease.id, 'description', e.target.value)}
              placeholder="Disease Description"
            />
          </div>

          <button
            className="delete-button"
            onClick={() => handleDelete(disease.id)}
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {diseases.length > 0 && (
        <div className="update-section">
          <button onClick={handleAddDisease} className="add-button" >
            Add new disease
          </button>
        </div>
      )}
    </div>
  );
};

export default DiseaseEditor;
