import React, { useState, useEffect } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import '../../../assets/css/Stats/editStatsPage/DiseaseEditor.css';
import { getToken } from '../../Security&Auth/authUtils';
import { API_BASE_URL } from '../../../config';
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  return { Authorization: `Bearer ${token}` };
};

const DiseaseEditor = () => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const token = getToken();

    axios.get(`${API_BASE_URL/diseases}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    })
    .then((response) => setDiseases(response.data))
    .catch((error) => console.error("Erreur lors de la récupération des maladies :", error));
  }, []);

  const handleInputChange = async (id, field, value) => {
    if (!id) return;

    const token = getToken();

    try {
      const response = await axios.put(
        `${API_BASE_URL}diseases/update/${id}/${field}`,
        value,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status === 200) {
        setDiseases(prev =>
          prev.map((disease) =>
            disease.id === id ? { ...disease, [field]: value } : disease
          )
        );
      }
    } catch (error) {
      console.error("Erreur de mise à jour :", error.message);
      alert("Une erreur est survenue lors de la mise à jour : " + error.message);
    }
  };

  const handleImageUpload = async (diseaseId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${API_BASE_URL}/diseases/update/image/${diseaseId}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: formData,
        }
      );

      if (response.ok) {
        alert("Image téléchargée avec succès !");
        const token = getToken();
        const updatedResponse = await axios.get(`${API_BASE_URL}/diseases`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
        setDiseases(updatedResponse.data);
      } else {
        alert("Échec du téléchargement de l'image.");
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_BASE_URL}/diseases/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Échec de la suppression de la maladie.");

      setDiseases(prev => prev.filter((disease) => disease.id !== id));
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  const handleAddDisease = async () => {
    try {
      const newDisease = {
        name: "",
        description: "",
        image: null,
      };

      const token = getToken();

      const response = await axios.post(
        `${API_BASE_URL}/diseases/add`,
        newDisease,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status === 200 && response.data) {
        setDiseases(prev => [...prev, response.data]);
      } else {
        throw new Error("Échec de l'ajout de la maladie.");
      }
    } catch (error) {
      console.error("Erreur d'ajout :", error.message);
      alert("Une erreur est survenue lors de l'ajout d'une nouvelle maladie : " + error.message);
    }
  };

  return (
    <div className="disease-editor">
      <h1 className='mt-[135px]'>Éditeur de Maladies</h1>

      {diseases.map((disease) => (
        <div key={disease.id} className="disease-container">
          <div className="image-section">
            <img 
              src={disease.image ? `data:image/jpeg;base64,${disease.image}` : ''} 
              alt={disease.name} 
            />
            <label className="upload-button">
              <FaUpload /> Télécharger une nouvelle image
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
              placeholder="Nom de la maladie"
            />
            <textarea
              value={disease.description || ''}
              onChange={(e) => handleInputChange(disease.id, 'description', e.target.value)}
              placeholder="Description de la maladie"
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

      <div className="update-section">
        <button onClick={handleAddDisease} className="add-button">
          Ajouter une nouvelle maladie
        </button>
      </div>
    </div>
  );
};

export default DiseaseEditor;
