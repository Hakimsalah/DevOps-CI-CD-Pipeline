import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../Security&Auth/authUtils'; // chemin à ajuster selon votre structure

import { API_BASE_URL } from '../../config';


const FormActualite = () => {
  const [actualites, setActualites] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    fetchActualites();
  }, []);



  const fetchActualites = async () => {
    try {
      const token = getToken(); // Récupérer le token
      const response = await axios.get(`${API_BASE_URL}/api/actualites`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token ici
        },
      });
      setActualites(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités', error);
    }
  };

  

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('descripation', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      const token = getToken(); // Récupérer le token
      await axios.post(`${API_BASE_URL}/api/actualites`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token ici
        },
      });
      fetchActualites();
      setFormData({ title: '', date: '', location: '', description: '', image: null });
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’actualité', error);
    }
  };
  

  
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      try {
        const token = getToken(); // Récupérer le token
        await axios.delete(`${API_BASE_URL}/api/actualites/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête
          },
        });
        fetchActualites();
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  

  return (
    <div className="max-w-3xl mx-auto mt-[200px] p-8 bg-white rounded-lg shadow-lg font-['Roboto']">
      <h1 className="text-center mb-10 text-2xl font-bold mb-2 text-gray-700 ">
        Ajouter une Actualité
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-[#555]">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-[#555]">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-[#555]">Lieu</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-[#555]">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-[#555]">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded font-medium hover:from-green-500 hover:to-blue-500 transition"
        >
          Ajouter
        </button>
      </form>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-[#2c3e50]">Liste des actualités</h2>
        <ul className="list-none p-0">
          {actualites.map((actu) => (
            <li
              key={actu.id}
              className="flex justify-between items-center p-4 border-b border-gray-200"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#2c3e50]">{actu.title}</h3>
                <p className="mt-1 text-[#555]">{actu.descripation}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(actu.id)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded font-medium hover:from-green-500 hover:to-blue-500 transition"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormActualite;
