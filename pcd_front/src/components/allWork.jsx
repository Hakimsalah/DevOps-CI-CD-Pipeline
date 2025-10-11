import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import AIRecommendation from './ai/rec';
import StatsPage from './Stats/Overview/statsPage';
import DiseaseOverview from './Stats/DiseaseOverview/diseaseOverview';

import Hygiene from './Stats/Hygiene/hygiene'
import GoogleCalendar from './Calendar/GoogleCalendar';
import ContactUS from './ContactUS/contactup';
import Brochure from './pages/Brochure';
import UserCalendar from './Calendar/UserCalendar';
import Acceuil from './Acceuil/Acceuil';
import EditStatisticsPage from './Stats/editStatsPage/EditStatisticsPage';
import UserManagement from './edit/userManagement';
import EditNewsPage from './edit/editNews';
import DiseaseEditor from './Stats/editStatsPage/DiseaseEditor';
import GermEditor from './Stats/editStatsPage/HygieneEditor';
import ResetPassword from './header/ResetPassword';
import Forum from './forum/forum';
import EditMembresPage from './edit/EditMembresPage'
import RoleProtectedRoute from './Security&Auth/RoleProtectedRoute';
import Actualite from './edit/editactualite';
import AdminBrochure from './edit/AdminBrochure';
const ALL = () => {

  /*const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };*/
  

  /*const [user, setUser] = useState(() => {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });*/

  //let superUser = true;
  //let User =  true;
  const userData = JSON.parse(localStorage.getItem("user"));

  const role = userData?.userRole;

  const isSuperUser = role === "ADMIN";
  const isUser = role === "USER";


  return (
    <Router>
      
      <Header superUser={isSuperUser} User={isUser}/>
      <Routes>
        {/* Set Acceuil as the default route at "/" */}
        <Route path="/" element={<Acceuil />} />

        {/* Other routes */}
        <Route path="/ai-recommendation" 
          element={
            <RoleProtectedRoute allowedRoles={['USER','ADMIN']}>
              <AIRecommendation />
            </RoleProtectedRoute>
          }
        />
        <Route path="/edit/stats" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
             <EditStatisticsPage/> 
          </RoleProtectedRoute>
          
        } 
        />

        
        <Route path="/edit/diseases-overview" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
            <DiseaseEditor />
          </RoleProtectedRoute>
        }
        />

        <Route path="/edit/germs-overview" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
            <GermEditor/>
          </RoleProtectedRoute>
        }
        />

        <Route path="/statistics/overview" element={<StatsPage />} />
        <Route path="/statistics/diseases" element={<DiseaseOverview />} />
        <Route path="/statistics/hygiene" element={<Hygiene />} />
        

        {/* Optionally keep /Homepage as an alias for Acceuil */}
        <Route path="/Homepage" element={<Acceuil />} />

        <Route path = "/manage-accounts" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
            <UserManagement/>
          </RoleProtectedRoute>
        } 
        />

        <Route path="/calendar" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
            <GoogleCalendar/>
          </RoleProtectedRoute>
        }/>


        <Route path="/calendar" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <GoogleCalendar/>
          </RoleProtectedRoute>
        } />
        <Route path="/contactUS"
        element={
            <RoleProtectedRoute allowedRoles={['VISITOR']}>
              <ContactUS />
            </RoleProtectedRoute>
          }
        />

        
        <Route path="/Brochure" element={<Brochure />} />

        <Route path="/admineBrochure" element={
                    <RoleProtectedRoute allowedRoles={['ADMIN']}>
                                <AdminBrochure />
                    </RoleProtectedRoute>
          } />

        <Route path="/Actualite" element={
              <RoleProtectedRoute allowedRoles={['ADMIN']}>
                  <Actualite />
              </RoleProtectedRoute>
          } />

        

       
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/forum" 
        element={
          <RoleProtectedRoute allowedRoles={['USER','ADMIN']}>
            <Forum />
          </RoleProtectedRoute>
        }
        />
        <Route path="/edit/pres-membre-proj" 
        element={
          <RoleProtectedRoute allowedRoles={['ADMIN']}>
            <EditMembresPage/>
          </RoleProtectedRoute>
        
        }
        />

      </Routes>
    </Router>
  );
};

export default ALL;