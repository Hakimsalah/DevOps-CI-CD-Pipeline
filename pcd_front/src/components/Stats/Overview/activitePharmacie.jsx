import React, { useState, useEffect } from 'react';
import img1 from '../../../assets/images/Stats/Overview/pharmacie/img1.jpg';
import img2 from '../../../assets/images/Stats/Overview/pharmacie/img2.jpg';
import img3 from '../../../assets/images/Stats/Overview/pharmacie/img3.webp';
import img4 from '../../../assets/images/Stats/Overview/pharmacie/img4.avif';
import img5 from '../../../assets/images/Stats/Overview/pharmacie/img5.webp';
import img6 from '../../../assets/images/Stats/Overview/pharmacie/img6.jpg';
import img7 from '../../../assets/images/Stats/Overview/pharmacie/img7.jpg';
import img8 from '../../../assets/images/Stats/Overview/pharmacie/img8.jpg';
import img9 from '../../../assets/images/Stats/Overview/pharmacie/img9.webp';
import img10 from '../../../assets/images/Stats/Overview/pharmacie/img10.jpg';
import arrowLeft from '../../../assets/images/Stats/Overview/pharmacie/left-arrow.png';
import arrowRight from '../../../assets/images/Stats/Overview/pharmacie/right-arrow.png';
import '../../../assets/css/Stats/Overview/activitePharmacie.css';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
const infoItems = [
    { id: 1, text: 'Validation pharmaceutique des prescriptions et dispensation journalière individuelle Nominative (DIJN)' },
    { id: 2, text: 'Programme pharmaceutique centré sur le patient' },
    { id: 3, text: 'Reconstitution des médicaments anticancéreux' },
    { id: 4, text: 'Centralisation de la préparation des médicaments injectables (stériles : antiviraux, antifongiques, immunosuppresseurs)' },
    { id: 5, text: 'Premier centre hospitalier qui effectue le contrôle qualité et le dosage des préparations médicamenteuses' },
    { id: 6, text: 'Préparation des poches de nutrition parentérale et collyres' },
    { id: 7, text: 'Suivi du circuit de stérilisation des dispositifs médicaux' },
    { id: 8, text: 'Activité d’enseignement de recherche et de formation (thèse d’exercices en sciences pharmaceutiques, PFE, master...)' },
    { id: 9, text: 'Gestion des essais cliniques' },
    { id: 10, text: 'Gestion des dossiers de facturation des complications post-greffe' },
  ];

const ActivitePharmacie = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container" role="region" aria-label="Dynamic Carousel">
      <div className="carousel">
        {/* Carousel Images */}
        <div className="carousel-image-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}: ${infoItems[index]?.text || 'No description'}`}
              className={`carousel-image ${currentIndex === index ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Text Overlay */}
        <div className="carousel-info" role="text">
          <p>{infoItems[currentIndex]?.text || 'No description available'}</p>
        </div>

        {/* Navigation Arrows */}
        <div className="carousel-controls">
          <button
            onClick={goToPrevious}
            className="carousel-btn prev-btn"
            aria-label="Previous slide"
          >
            <img src={arrowLeft} alt="Previous" className="arrow-icon" />
          </button>
          <button
            onClick={goToNext}
            className="carousel-btn next-btn"
            aria-label="Next slide"
          >
            <img src={arrowRight} alt="Next" className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitePharmacie  ;
