import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/Stats/Overview/ParagraphActPha.module.css';
import { API_BASE_URL } from '../../../config';
// ✅ Import du token
import { getToken } from '../../Security&Auth/authUtils'; // Vérifie ce chemin

const ParagraphActPha = () => {
  const [paragraph, setParagraph] = useState('');

  useEffect(() => {
    const getParagraph = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ParagraphActPha`, {
          method: 'GET',
          headers: {
            // Aucun token requis
          },
        });
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const data = await response.json();
        console.log('API Response :', data);
  
        if (Array.isArray(data) && data.length > 0 && data[0].paragraph) {
          setParagraph(data[0].paragraph);
        }
      } catch (err) {
        console.error('Erreur API:', err.message);
        alert("Erreur lors de la récupération du paragraphe.");
      }
    };
  
    getParagraph();
  }, []);
  

  return (
    <div className={styles.ParagraphActPhaContainer}>
      <h2 className={styles.ParagraphActPhaTitle}>
        Activités du service pharmacie du CNGMO
      </h2>
      <p className={styles.ParagraphActPhaText}>
        {paragraph}
      </p>
    </div>
  );
};

export default ParagraphActPha;
