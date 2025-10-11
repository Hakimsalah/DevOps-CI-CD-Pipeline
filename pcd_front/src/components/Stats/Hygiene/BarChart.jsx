import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import '../../../assets/css/Stats/Hygiene/barChart.css'; // Import custom styles

export const BarChart = ({ data, year, service, surface, disinfectant}) => {
  
  const getXAxisLabel = () => {
    if (year === "Year") {return "years";}
    else {
      if (service ==="Service") {return "Surfaces";}
      else {return "Services";}
    }
  };

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Stats</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data}>
            <XAxis
              dataKey="name"
              label={{ value: getXAxisLabel(), position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: 'Quantity', position: 'insideLeft', angle: -90, offset: 15 }}
            />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="quantity" barSize={20} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};