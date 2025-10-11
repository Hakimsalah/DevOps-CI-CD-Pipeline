import {Numbers} from './numbers';
import TransActChart from './transActChart';
import TransplantActivityTable from './activiteGreffe';
import {PatientBox} from './overviewKey';
import PatientDemographicsChart from './patientDemographics';
import TransplantDemographicsChart from './transplantDemographics';
import ActivitePharmacie from './activitePharmacie';
import Footer from '../../footer/footer';
import ChatBot from '../../ChatBot/ChatBot';
import { MaladiePriseEnCharge } from './MaladPriseEnCharge';
import { IndAutoG } from './IndAutoG';
import ParagraphActPha from './paragraphActPha';
function StatsPage() {
  return (
    <>
      <div style={{ display: "flex", marginBottom: "50px", padding: "40px", alignSelf: "center"}}>
        <div
          className="mee"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PatientBox />
          <Numbers />
          <PatientDemographicsChart />
          <MaladiePriseEnCharge style={{ width: "100%" }} />
          <TransplantDemographicsChart />
          <IndAutoG/>
          <TransActChart />
          <TransplantActivityTable />
          <ParagraphActPha/>
          <ActivitePharmacie />
        </div>
      </div>
      <ChatBot/>
      <Footer />
    </>
  );
}

export default StatsPage;
