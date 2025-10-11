import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../../../assets/css/Stats/Overview/patientDemographics.css';
import { getToken } from '../../Security&Auth/authUtils'; // Assure-toi que ce chemin est correct
import { API_BASE_URL } from '../../../config';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatientDemographicsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patientDemographics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Échec de récupération des données !");
        }
  
        const data = await response.json();
        console.log(data);
        setChartData(data);
  
      } catch (err) {
        console.error("Erreur de récupération :", err);
        setError(err.message);
      }
    };
  
    handleData();
  }, []);
  

  const data = {
    labels: ['0-18', '19-30', '31-45', '46-60', '61+'],
    datasets: [
      {
        label: 'Nombre de patients',
        data: chartData.length > 0
          ? [
              chartData[0].category1,
              chartData[0].category2,
              chartData[0].category3,
              chartData[0].category4,
              chartData[0].category5,
            ]
          : [],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Répartition des patients par tranche d’âge (Centre de Moelle)',
        color: '#2c3e50',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#7f8c8d' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#7f8c8d', stepSize: 50, max: 200 },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
    },
  };

  return (
    <div className="demographicsChartContainer">
      {error && (
        <div style={{ color: 'red', padding: '10px' }}>
          {error}
        </div>
      )}

      {chartData.length > 0 && (
        <>
          <div style={{ fontFamily: "Roboto", fontSize: "18px", flex: "0.5", padding: "10px 20px" }}>
            {chartData[0].description}
          </div>
          <div className="chartWrapper">
            <Bar data={data} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default PatientDemographicsChart;
