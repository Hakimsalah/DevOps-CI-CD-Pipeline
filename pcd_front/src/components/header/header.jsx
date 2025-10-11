
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/css/header/header.css';
import logo from '../../assets/images/dashboard/logo3.png'
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin ,FaFacebookMessenger} from 'react-icons/fa';
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { getUserName } from '../Security&Auth/authUtils';
import React, { useEffect,useContext } from "react";
import  Notifications  from './Notifications';
import { API_BASE_URL } from '../../config';






const TopBar = () => {
  return(
      <div className="bg-gradient-to-r from-[#7bed9f] via-[#a1c6ea] to-[#7bed9f] text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><FaPhone /> +216 71 568 903</span>
          <span className="flex items-center gap-1"><FaEnvelope /> Centredegreffe@gmail.com</span>
        </div>
        <div className="flex items-center gap-4">
          <Link className="hover:text-gray-300" to="#">
            <FaFacebook/>       
          </Link>
          <Link className="hover:text-gray-300" to="#">
            <FaInstagram/>       
          </Link>
          <Link className="hover:text-gray-300" to="#">
            <FaLinkedin/>       
          </Link>
        </div>
    </div>
  );
};

const Header = ({superUser,User}) => {

  return (
    <nav className= "fixed  z-50 w-full top-0" >
      <TopBar/>
      <Header1 superUser={superUser} User={User}/>
    </nav>
  )
}


const Header1 = ({superUser,User}) => {


  const [isOpen,setIsOpen] = useState(false);
  const [isClicked,setIsClicked] = useState(false);
  const [user_name,setUser_name] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      // Assuming getUserName() is an async function
      const name = await getUserName();
      setUser_name(name);
    };
    fetchUserName();
  }, []);


  const handleDialogConn = ()=>{
      setIsOpen(!isOpen);
      console.log(isOpen)
  }
  const handleForgetPassword = ()=>{    
      setIsOpen(false);
      setIsClicked(!isClicked);
  }
  const handleLogin= async (event) => {
    event.preventDefault(); //empecher le chargement de la page 
    const email = event.target.email.value;
    const password = event.target.password.value;
    try{
      const response = await axios.post(`${API_BASE_URL}/api/users/login`,{
        email,
        password
      });

      //Reponse du Backend 
      const data = response.data;
      console.log("Connexion réussie", data);


      toast.success("Login Successfull");

    // Save to token and username and userRole localStorage
      localStorage.setItem("user", JSON.stringify(data));

      //Fermer le Dialog 
      setIsOpen(false);
      window.location.reload();

      // Rediriger ou recharger si nécessaire
      // window.location.href = "/Homepage";
    }catch(error){
      console.error("Erreur lors de la connexion", error);
      alert("Email ou mot de passe incorrect.");
      
    }


  }

  const [resetEmail, setResetEmail] = useState('');

  const handleMailReset = async () => {
    if (!resetEmail.trim()) {
      toast.error("Veuillez entrer une adresse email.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/forgot-password`,
        resetEmail,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      toast.success(response.data); // "Email de réinitialisation envoyé !"
      setIsClicked(false); // Close dialog
      setResetEmail(''); // Reset field
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de réinitialisation", error);
      toast.error("Erreur lors de l'envoi du mail. Veuillez réessayer.");
    }
  };

  const handleLogOut = ()=>{
    localStorage.removeItem("user"); // Remove the saved user info (including token)
    window.location.href = "/"; // Or use navigate("/login") if using React Router
    toast.success("Déconnexion réussie !");
  };



  return (
    <header className="header bg-[#2c3e50] text-white py-4 ">
      {/* Left: Logo and Title */}
      <div className="header-left flex items-center gap-4">
        <div className="logo flex items-center">
          <img src={logo} alt="Centre de greffe de Tunis Logo" className="logo-img" />
          <div className="w-15">
            <div className="logo-text text-l font-bold">Centre de greffe</div>
            <div className="logo-text text-l font-bold text-center "> de Tunis</div>
          </div>
          

        </div>
      </div>

      {(superUser || User) && (
      <p className="text-xl font-semibold text-white bg-transparent from-indigo-500 to-purple-600 px-10 py-2 rounded-2xl shadow-md">
        Bienvenu {user_name} 👋
      </p>
    )}

      {/* Center: Navigation Menu */}
      <nav className="nav-menu flex-grow flex justify-center">
        <ul className="nav-list flex gap-8">
          <li className="nav-item">
            <Link className="nav-link" to="/Homepage">
              Acceuil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Brochure">
                Brochure
            </Link>
          </li>

          { (!superUser && !User) && (
            <li className="nav-item">
              <Link className="nav-link" to="/contactUS">
                Contactez-nous
              </Link>
            </li>
          )}


          <li className="nav-item dropdown-custom">
            <span className="nav-link dropdown-toggle">Statistique</span>
            <ul className="dropdown-menu-custom">
              <li>
                <Link className="dropdown-item" to="/statistics/overview">
                Vue d'ensemble
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/statistics/diseases">
                Aperçu des maladies
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/statistics/hygiene">
                Hygiène
                </Link>
              </li>
            </ul>
          </li>


          { (superUser || User) && (<li className="nav-item">
            <Link className="nav-link" to="/ai-recommendation">
              Outils de Recommandation
            </Link>
          </li>)}

          {superUser && (<li className="nav-item">
            <Link className="nav-link" to="/Calendar">
              Calendrier
            </Link>
            </li>)}

          {/** drop 2 */}
          {superUser && (
            <li className="nav-item dropdown-custom">
            <span className="nav-link dropdown-toggle">Modifier</span>
            <ul className="dropdown-menu-custom">

              <li>
                <Link className="dropdown-item" to="/edit/stats">
                  Statistiques
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/edit/diseases-overview">
                  les statistiques des maladies
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/edit/germs-overview">
                  Les statistiques de germes
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/edit/pres-membre-proj">
                  la presentation de membre de projet 
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admineBrochure">
                  Qestions et documents 
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Actualite">
                 Actualité
                </Link>
              </li>
            </ul>
          </li>) }


          {superUser && (
            <li className="nav-item">

              <Link className="nav-link" to="/manage-accounts">
                Gérer les comptes 


              
              </Link>
            </li>
            )}



          
          






        </ul>
      </nav>

      {/* Right: Logout Button */}
      <div className="header-right flex gap-[10px] justify-between ">

        {(!superUser && !User ) && 

           <button className="   text-white px-4 py-1  rounded-full " onClick={handleDialogConn}>           

            Espace Médecin</button>
        }





{(superUser || User) &&(
      <Link to="/forum">
          <FaFacebookMessenger/>
      </Link>)}
      {(superUser || User) && <Notifications />}
        {(superUser || User) &&<button className="logout-btn bg-transparent text-white " onClick={handleLogOut}>
          <FaSignOutAlt className="logout-icon " /> 
        </button>}
      </div>

           {/* Modal pour etablir une connexion avec le medecin */}
                <Dialog open={isOpen} onClose={handleDialogConn} className="fixed inset-0 flex items-center justify-center z-50">
                  {/* Overlay */}
                  <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
          
                  {/* Dialog Panel */}
                  <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
                    <h2 className="text-xl font-bold mb-4">Connexion Espace Médecin</h2>
                    <form onSubmit={handleLogin}>
                      <label className="block mb-2">Email *</label>
                      <input name="email" type="text" className="w-full bg-white p-2 border rounded mb-4" required/>
          
                      <label className="block mb-2">Mot de passe *</label>
                      <input  name="password" type="password" className="w-full bg-white p-2 border rounded mb-4"required />
          

                      <Link className="text-blue-600 text-sm" onClick={handleForgetPassword}>
                      mot de passe oublié ?

                      
                      </Link>
          
                      <div className="mt-4 flex justify-between">
                        <button type="submit" className="bg-[#333D79] text-white px-4 py-2 rounded" >
                          Se connecter
                        </button>
                        <button type="button" className="text-gray-600 px-4 py-2" onClick={handleDialogConn}>
                          Annuler
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Dialog>  

                {/* Dialog pour le Mot de passe oublié */}

                <Dialog open={isClicked} onClose={handleForgetPassword} className="fixed inset-0 flex items-center justify-center z-50">
                  {/* Overlay */}
                  <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
          
                  {/* Dialog Panel */}
                  <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
                    <h2 className="text-xl font-bold mb-4">Mot de passe oublié</h2>
                    <form>
                      <label className="block mb-2">Ecrivez votre adresse mail  </label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded mb-4"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
          
                      <div className="mt-4 flex justify-between">
                        <button type="button" className="bg-[#333D79] text-white px-4 py-2 rounded" onClick={handleMailReset}>
                          Confirmer 
                        </button>
                        <button type="button" className="text-gray-600 px-4 py-2" onClick={handleForgetPassword}>
                          Annuler
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Dialog>  







    </header>
  );
};

export default Header;
