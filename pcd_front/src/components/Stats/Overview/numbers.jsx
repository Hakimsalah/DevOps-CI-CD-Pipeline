import doctor from '../../../assets/images/Stats/Overview/doctor.png';
import nurse from '../../../assets/images/Stats/Overview/nurse.png';
import patient from '../../../assets/images/Stats/Overview/patient.png';
import styles from '../../../assets/css/Stats/Overview/numbers.module.css';
import { useState, useEffect } from 'react';
import { getToken } from '../../Security&Auth/authUtils'; // Assure-toi du chemin
import { API_BASE_URL } from '../../../config';

export const Numbers = () => {
    const [doctorCount, setDoctorCount] = useState(0);
    const [nurseCount, setNurseCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [doctorTarget, setDoctorTarget] = useState(0);
    const [nurseTarget, setNurseTarget] = useState(0);
    const [patientTarget, setPatientTarget] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStats = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/StaffPatientStats`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des statistiques !");
            }
      
            const data = await response.json();
            setDoctorTarget(data[0].doctors || 0);
            setNurseTarget(data[0].nurses || 0);
            setPatientTarget(data[0].patients || 0);
          } catch (err) {
            console.log("Erreur :", err.message);
            setError(err.message);
          }
        };
      
        getStats();
      }, []);
      

    const animateCounter = (currentCount, targetCount, setCount, intervalTime) => {
        if (currentCount >= targetCount) return;
        const intervalId = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount >= targetCount) {
                    clearInterval(intervalId);
                    return targetCount;
                }
                return prevCount + 1;
            });
        }, intervalTime);
        return () => clearInterval(intervalId);
    };

    useEffect(() => animateCounter(doctorCount, doctorTarget, setDoctorCount, 89), [doctorTarget]);
    useEffect(() => animateCounter(nurseCount, nurseTarget, setNurseCount, 89), [nurseTarget]);
    useEffect(() => animateCounter(patientCount, patientTarget, setPatientCount, 45), [patientTarget]);

    return (
        <div className={styles.container}>
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
            )}

            <div className={styles.innerContainer}>
                <img src={doctor} alt="doctor logo" className={styles.logo} />
                <div className={styles.number}>{doctorCount}</div>
                <div className={styles.desc}>
                    <span className={styles.occ}>Docteurs</span>
                    <span className={styles.annee}>Année 2024-2025</span>
                </div>
            </div>

            <div className={styles.innerContainer}>
                <img src={nurse} alt="nurse logo" className={styles.logo} />
                <div className={styles.number}>{nurseCount}</div>
                <div className={styles.desc}>
                    <span className={styles.occ}>Infirmières</span>
                    <span className={styles.annee}>Année 2024-2025</span>
                </div>
            </div>

            <div className={styles.innerContainer}>
                <img src={patient} alt="patient logo" className={styles.logo} />
                <div className={styles.number}>{patientCount}</div>
                <div className={styles.desc}>
                    <span className={styles.occ}>Patients</span>
                    <span className={styles.annee}>Année 2024-2025</span>
                </div>
            </div>
        </div>
    );
};
