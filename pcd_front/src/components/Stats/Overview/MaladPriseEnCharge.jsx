import React, { useEffect, useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getToken } from "../../Security&Auth/authUtils"; // Import your token utility
import styles from '../../../assets/css/Stats/Overview/MaladPriseEnCharge.module.css';
import { API_BASE_URL } from '../../../config';

const PieChart = ({ data, colors }) => {
  const renderLabel = ({ acronym, percentage }) => `${acronym} (${percentage}%)`;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="percentage"
          nameKey="acronym"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={renderLabel}
          labelLine={{ stroke: '#666', strokeWidth: 1 }}
          animationDuration={800}
          animationBegin={200}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value}%`, name]}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => (
            <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>
              {value}
            </span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export const MaladiePriseEnCharge = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const getData1 = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/MaladiePriseEnCharge`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log('Retrieved Data from API', data);
        setData1(data);
      } catch (err) {
        console.log('Error fetching data:', err.message);
      }
    };

    getData1();
  }, []);

  // 🔐 Fonction sécurisée pour générer des couleurs aléatoires
  const generateSecureRandomColor = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const color = array[0].toString(16).slice(0, 6); // Prendre 6 caractères
    return `#${color.padEnd(6, '0')}`; // Padding si nécessaire
  };

  const COLORS1 = data1.length
    ? Array.from({ length: data1.length }, () => generateSecureRandomColor())
    : [];

  const COLORS2 = data1.length
    ? Array.from({ length: data1.length }, () => generateSecureRandomColor())
    : [];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Maladies prises en charge par la greffe</h2>
      <div className={styles.chartContainer}>
        <div className={styles.chartSection}>
          <div className={styles.legendContainer}>
            <h3 className={styles.subTitle}>Légende</h3>
            {data1.map(({ acronym, disease }, index) => (
              <div key={index} className={styles.legendItem}>
                <span className={styles.acronym}>{acronym}:</span>
                <span className={styles.fullName}>{disease}</span>
              </div>
            ))}
          </div>
          <div className={styles.chartWrapper}>
            <PieChart data={data1} colors={COLORS1} />
          </div>
        </div>
        <div className={styles.chartSection}>
          <div className={styles.chartWrapper}>
            <PieChart data={data1} colors={COLORS2} />
          </div>
        </div>
      </div>
    </div>
  );
};
