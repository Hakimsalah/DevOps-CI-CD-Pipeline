import React, { useState, useEffect } from 'react';
import styles from '../../../assets/css/Stats/editStatsPage/EditParagraphActPha.module.css';
import { FaSave } from 'react-icons/fa';
import { API_BASE_URL } from '../../../config';

// ✅ Import du token
import { getToken } from '../../Security&Auth/authUtils'; // Assure-toi que ce chemin est correct

const EditParagraphActPha = ({ initialText = '', onSubmit }) => {
  const [text, setText] = useState(initialText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken(); // ✅ Récupération du token

      const response = await fetch(`${API_BASE_URL}/diseases/add/ParagraphActPha`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ Envoi du token ici
        },
        body: JSON.stringify({
          paragraph: text,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      alert('Changes done successfully!');
      if (onSubmit) onSubmit(); // callback si fourni
    } catch (err) {
      console.error('Update failed:', err.message);
      alert("Erreur lors de la mise à jour du paragraphe.");
    }
  };

  useEffect(() => {
    const getParagraph = async () => {
      try {
        const token = getToken(); // ✅ Token aussi pour la requête GET

        const response = await fetch(`${API_BASE_URL}/diseases/add/ParagraphActPha/ParagraphActPha`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log('API Response :', data);
        if (Array.isArray(data) && data.length > 0 && data[0].paragraph) {
          setText(data[0].paragraph);
        }
      } catch (err) {
        console.error('Fetching paragraph failed:', err.message);
        alert("Impossible de récupérer le paragraphe depuis l'API.");
      }
    };

    getParagraph();
  }, []);

  return (
    <div className={styles.EditParagraphActPhaContainer}>
      <h2 className={styles.EditParagraphActPhaTitle}>
        Modifier le paragraphe des activités du service pharmaceutique
      </h2>
      <form onSubmit={handleSubmit} className={styles.EditParagraphActPhaForm}>
        <label htmlFor="paragraphText" className={styles.EditParagraphActPhaLabel}>
          Contenu du paragraphe
        </label>
        <textarea
          id="paragraphText"
          className={styles.EditParagraphActPhaTextarea}
          value={text}
          onChange={handleChange}
          placeholder="Entrez le texte du paragraphe ici..."
          rows="8"
        />
        <button type="submit" className={styles.EditParagraphActPhaSubmitButton}>
          <FaSave className={styles.EditParagraphActPhaIcon} /> Sauvegarder les modifications
        </button>
      </form>
    </div>
  );
};

export default EditParagraphActPha;
