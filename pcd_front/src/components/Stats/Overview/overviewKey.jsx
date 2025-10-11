import patientLogo from '../../../assets/images/Stats/Overview/patient.png';
import transplantLogo from '../../../assets/images/Stats/Overview/transplant.png';
import '../../../assets/css/Stats/Overview/overviewKey.css';
import { useState, useEffect } from 'react';
// Box Component
const Box = ({ logo, title, color, number }) => {
    return (
      <div className="totalPatientBox">
        <div className="boxHeader">
            <img src={logo} alt="Logo" className="patientLogo" />
          <span>{title}</span>
        </div>
        <div className="boxContent">
          <AnimatedBarChart barColor={color} /> {/* Pass color to AnimatedBarChart */}
          <span className="patientCount" style={{ "--color": color }}>{number}+</span>
        </div>
      </div>
    );
  };
  
  // AnimatedBarChart Component
  const AnimatedBarChart = ({ barColor }) => {
    return (
      <div className="barChart">
        <div className="bar" style={{ '--bar-height': '20px', '--bar-color': barColor }}></div>
        <div className="bar" style={{ '--bar-height': '40px', '--bar-color': barColor }}></div>
        <div className="bar" style={{ '--bar-height': '30px', '--bar-color': barColor }}></div>
        <div className="bar" style={{ '--bar-height': '50px', '--bar-color': barColor }}></div>
        <div className="bar" style={{ '--bar-height': '35px', '--bar-color': barColor }}></div>
        <div className="bar" style={{ '--bar-height': '45px', '--bar-color': barColor }}></div>
      </div>
    );
  };


  export const PatientBox = () => {
    return (
        <div className= "patientBox" style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "100px  0px"}}>
            <Box logo={patientLogo} title="total patients" color="blue" number="22410" />
            <Box logo={transplantLogo} title="total transplants" color="#2ecc71" number="365" />
            <SurvivalBox />
        </div>
    );
};


const statistiques = [
    { nombre: 85, message: "de greffe réussies pour l'Aplasie médullaire" },
    { nombre: 77, message: "de greffe réussies pour le Lymphome" },
    { nombre: 58, message: "de greffe réussies pour la Leucémie aigue" }
  ];
  
export const SurvivalBox = () => {
    const [currentStat, setCurrentStat] = useState(0);
  
    // Auto-slide every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % statistiques.length);
      }, 3000);
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    // Manual navigation
    const goToSlide = (index) => {
      setCurrentStat(index);
    };
  
    return (
      <div className="SurvivalBox">
        <div className="statBox">
          {statistiques[currentStat].nombre} %
        </div>
        <div className="descBox">
          {statistiques[currentStat].message}
        </div>
        <div className="dots">
          {statistiques.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentStat ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  };
  