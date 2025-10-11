import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { API_BASE_URL } from '../../../config';
// ✅ Import du token
import { getToken } from '../../Security&Auth/authUtils'; // adapte le chemin si besoin

const TransActChart = () => {
  const [data, setData] = useState([]);
  const [nbAutographs, setNbAutographs] = useState(0);
  const [nbAllographs, setNbAllographs] = useState(0);
  const [nbTotalop, setNbTotalop] = useState(0);
  const [recentdata, setRecentdata] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/TransAct`, {
          method: 'GET',
          headers: {
            // Aucune autorisation nécessaire
          },
        });
  
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
  
        const data = await response.json();
        const recent = data
          .sort((a, b) => b.year - a.year)
          .slice(0, 20)
          .sort((a, b) => a.year - b.year);
        
        setRecentdata(recent);
        setData(data);
  
        const n1 = data.reduce((acc, item) => acc + item.nbAllographs, 0);
        const n2 = data.reduce((acc, item) => acc + item.nbAutographs, 0);
        const n3 = n1 + n2;
  
        setNbAllographs(n1);
        setNbAutographs(n2);
        setNbTotalop(n3);
  
        console.log('API Response:', data);
      } catch (err) {
        console.error('Erreur API:', err.message);
        alert("Erreur lors de la récupération des données de greffe.");
      }
    };
  
    getData();
  }, []);
  

  return (
    <div style={{ width: "80%", display: 'flex', flexDirection: 'column', alignItems: 'center', margin: "50px auto" }}>
      <h2 style={{ margin: '0', fontWeight: 'bold', fontSize: '24px' }}>
        Evolution de l'activité de greffe au fil des années
      </h2>
      <p style={{ margin: '5px 0', fontSize: '18px' }}>N= {nbTotalop}</p>
      <p style={{ margin: '5px 0', fontSize: '16px' }}>
        Allogreffes (n={nbAllographs}) | Autogreffes (n={nbAutographs})
      </p>

      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart width={100} height={250} data={recentdata}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="year"
              label={{
                value: 'Année',
                position: 'insideBottom',
                offset: -5,
              }}
              tick={{ angle: 0, textAnchor: 'middle' }}
            />
            <YAxis
              label={{
                value: 'Nombre de greffe',
                position: 'insideLeft',
                angle: -90,
                offset: 15,
              }}
            />
            <Tooltip />
            <Bar dataKey="nbAllographs" barSize={20} fill="#6495ED" />
            <Bar dataKey="nbAutographs" barSize={20} fill="#CD5C5C" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransActChart;
