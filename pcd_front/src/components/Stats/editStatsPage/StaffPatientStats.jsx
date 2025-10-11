import React, { useEffect, useState } from 'react';
import { FaUserMd, FaUserNurse, FaUsers } from 'react-icons/fa';
import '../../../assets/css/Stats/editStatsPage/StaffPatientStats.css';
import { getToken } from '../../Security&Auth/authUtils'; // ajuste le chemin si nécessaire
import { API_BASE_URL } from '../../../config';

const StaffPatientStats = ({ onSubmit }) => {
  const [doctors, setDoctors] = useState(0);
  const [nurses, setNurses] = useState(0);
  const [patients, setPatients] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Token manquant. Veuillez vous reconnecter.");
        }

        const response = await fetch(`${API_BASE_URL}/StaffPatientStats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des statistiques");
        }

        const data = await response.json();
        setData(data);
        setDoctors(data[0].doctors || 0);
        setNurses(data[0].nurses || 0);
        setPatients(data[0].patients || 0);
      } catch (err) {
        console.error("Erreur de récupération :", err.message);
        setError(err.message);
      }
    };

    getStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorsNum = Math.floor(parseFloat(doctors) || 0);
    const nursesNum = Math.floor(parseFloat(nurses) || 0);
    const patientsNum = Math.floor(parseFloat(patients) || 0);

    if (isNaN(doctorsNum) || isNaN(nursesNum) || isNaN(patientsNum)) {
      alert("Veuillez entrer des nombres valides.");
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error("Token manquant. Veuillez vous reconnecter.");
      }

      const response = await fetch(`${API_BASE_URL}/StaffPatientStats`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctors: doctorsNum,
          nurses: nursesNum,
          patients: patientsNum,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour des statistiques.");
      }

      alert("Statistiques mises à jour avec succès !");
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Erreur de soumission :", err.message);
      alert(`Erreur : ${err.message}`);
    }
  };

  return (
    <div className="staff-patient-input">
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctors">
            <FaUserMd className="icon" /> Number of Doctors
          </label>
          <input
            type="number"
            id="doctors"
            value={doctors}
            onChange={(e) => setDoctors(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nurses">
            <FaUserNurse className="icon" /> Number of Nurses
          </label>
          <input
            type="number"
            id="nurses"
            value={nurses}
            onChange={(e) => setNurses(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="patients">
            <FaUsers className="icon" /> Number of Patients
          </label>
          <input
            type="number"
            id="patients"
            value={patients}
            onChange={(e) => setPatients(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <button type="submit" className="submit-button">
          Update Statistics
        </button>
      </form>
    </div>
  );
};

export default StaffPatientStats;
