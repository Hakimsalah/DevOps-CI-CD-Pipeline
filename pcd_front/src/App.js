
import React from 'react';
import ALL from './components/allWork';

import ContactSection from './components/Acceuil/horraire';
import Faqs from './components/pages/faqs';
import Faqs1 from './components/pages/faqs1';
import Conseil from './components/pages/conseil';
import Brochure from './components/pages/Brochure';
import Telechar from './components/pages/telechar';

import DiseaseEditor from './components/Stats/editStatsPage/DiseaseEditor';
import GermEditor from './components/Stats/editStatsPage/HygieneEditor';
import DisinfectantEditor from './components/Stats/Hygiene/selectionBarEditor';
import SelectionBar from './components/Stats/Hygiene/selectionBar';
import StatsPage from './components/Stats/Overview/statsPage';
import { Numbers } from './components/Stats/Overview/numbers';

import EditStatisticsPage from './components/Stats/editStatsPage/EditStatisticsPage';
import StaffPatientStats from './components/Stats/editStatsPage/StaffPatientStats';
import PatientDemographicsChart from './components/Stats/Overview/patientDemographics';
import PatientDemographicsInput from './components/Stats/editStatsPage/PatientDemographicsInput';
import TransplantDemographicsChart from './components/Stats/Overview/transplantDemographics';
import { MaladiePriseEnCharge } from './components/Stats/Overview/MaladPriseEnCharge';
import TransplantDiseasesInput from './components/Stats/editStatsPage/TransplantDiseasesInput';
import TransActChart from './components/Stats/Overview/transActChart';
import TransplantActivityInput from './components/Stats/editStatsPage/TransplantActivityInput';
import EditParagraphActPha from './components/Stats/editStatsPage/EditParagraphActPha';
import ParagraphActPha from './components/Stats/Overview/paragraphActPha';
import ActivitePharmacie from './components/Stats/Overview/activitePharmacie';
import EditActivitePharmacie from './components/Stats/editStatsPage/EditActivitePharmacie';
import ChatBot from './components/ChatBot/ChatBot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    /*<Forum/>*/
    
<>

  <ALL/>




  {/* your routes, layout, etc. */}
  <ToastContainer position="top-right" autoClose={3000} />

</>

  );
}



export default App;