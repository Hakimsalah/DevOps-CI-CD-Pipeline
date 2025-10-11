import { useEffect, useState } from 'react';
import DropDownButton from './dropdownbtn';
import { BarChart } from './BarChart';
import { getToken } from "../../Security&Auth/authUtils"; // ✅ adapte le chemin si nécessaire
import { API_BASE_URL } from '../../../config';

function SelectionBar() {
  const [chartData, setChartData] = useState([]);
  const [Year, setYear] = useState("Année");
  const [Service, setService] = useState("Service");
  const [Surface, setSurface] = useState("Surface");
  const [Disinfectant, setDisinfectant] = useState("Désinfectant");
  const [Data, setData] = useState({});
  
  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/utilizations/Lists`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    getLists();
  }, []);
  
  const handleGenerate = async () => {
    console.log({ Year, Service, Surface, Disinfectant });
    try {
      const response = await fetch(
        `${API_BASE_URL}/utilizations?disinf=${Disinfectant}&year=${Year}&service=${Service}&surface=${Surface}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);
      const transformed = data.map(([name, quantity]) => ({ name, quantity }));
      console.log("Transformed :", transformed);
  
      if (transformed.length === 0) {
        alert("Invalid Input or no data is available !");
        return;
      }
  
      setChartData(transformed);
      setYear("Année");
      setService("Service");
      setSurface("Surface");
      setDisinfectant("Désinfectant");
    } catch (err) {
      console.log('Fetch error:', err.message);
    }
  };
  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
        <DropDownButton label={Year} items={Data.years || []} setState={setYear} />
        <DropDownButton label={Disinfectant} items={Data.disinfectants || []} setState={setDisinfectant} />
        <DropDownButton label={Service} items={Data.services || []} setState={setService} />
        <DropDownButton label={Surface} items={Data.surfaces || []} setState={setSurface} />
        <button type="button" className="btn btn-outline-success" onClick={handleGenerate}>
          Génerer
        </button>
      </div>
      {chartData.length > 0 && (
        <BarChart
          data={chartData}
          year={Year}
          service={Service}
          surface={Surface}
          disinfectant={Disinfectant}
        />
      )}
    </>
  );
}

export default SelectionBar;
