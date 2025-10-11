import React, { useState } from 'react';
import EditStatistics from './EditStatistics';
import GraftSurvivalInput from './GraftSurvivalInput';
import PatientDemographicsInput from './PatientDemographicsInput';
import StaffPatientStats from './StaffPatientStats';
import TransplantActivityInput from './TransplantActivityInput';
import TransplantDiseasesInput from './TransplantDiseasesInput';
import '../../../assets/css/Stats/editStatsPage/EditStatisticsPage.css';
import Footer from '../../footer/footer';
import ChatBot from '../../ChatBot/ChatBot';
import EditParagraphActPha from './EditParagraphActPha';
import DisinfectantEditor from '../Hygiene/selectionBarEditor'

const EditStatisticsPage = () => {
  const [selectedOption, setSelectedOption] = useState('');

  // Handle dropdown selection
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Render the appropriate component based on selection
  const renderComponent = () => {
    switch (selectedOption) {
      case 'general':
        return <EditStatistics />;
      case 'graftSurvival':
        return <GraftSurvivalInput />;
      case 'patientDemographics':
        return <PatientDemographicsInput />;
      case 'staffPatientStats':
        return <StaffPatientStats />;
      case 'transplantActivity':
        return <TransplantActivityInput />;
      case 'transplantDiseases':
        return <TransplantDiseasesInput />;
      case 'EditStatisticsPage':
        return <EditParagraphActPha/>
      case 'DisinfectantEditor':
        return <DisinfectantEditor/>  
      
      default:
        return <p>Veuillez sélectionner une statistique à modifier</p>;
    }
  };

  return (
    <>
      <div className="edit-statistics-page">
      <h1>Edit Statistics</h1>
      <div className="select-container">
        <label htmlFor="stat-select">Select the statistic to update:</label>
        <select id="stat-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Choisissez une option --</option>
          <option value="general">Statistiques générales</option>
          <option value="graftSurvival">Taux de survie du greffon</option>
          <option value="patientDemographics">Données démographiques des patients</option>
          <option value="staffPatientStats">Statistiques du personnel et des patients</option>
          <option value="transplantActivity">Activité de transplantation au fil des années</option>
          <option value="transplantDiseases">Maladies couvertes par la transplantation</option>
          <option value="EditStatisticsPage">Paragraphe sur l'activité pharmaceutique</option>
          <option value="DisinfectantEditor">Utilisation des désinfactants</option>
            
        </select>

      </div>
      <div className="component-container">
        {renderComponent()}
      </div>
      <ChatBot/>
    </div>
    <Footer/>
    </>

  );
};

export default EditStatisticsPage;