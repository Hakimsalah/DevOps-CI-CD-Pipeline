import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/logoCentre.png";
import Calendar from "../Calendar/Calendarmeet";
import { Dialog } from "@headlessui/react";
import { useState } from "react";


const NavBar = () => {

  const [isOpen,setIsOpen] = useState(false);

  const handleDialogConn = ()=>{
    setIsOpen(!isOpen);
    console.log(isOpen)
  }



  return (
    <>
    <nav className="w-full fixed z-50 top-0 left-0 right-0 shadow-lg ">
      {/* Top Bar */}
      <div className="bg-[#333D79] text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><FaPhone /> +216 71 79 57 22</span>
          <span className="flex items-center gap-1"><FaEnvelope /> info@cnopt.tn</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
          <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-300"><FaLinkedin /></a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white py-0 px-0 flex justify-between items-center ">

        {/* Logo */}
          <a href="#" className="cursor-pointer"><img src={logo} alt="CNOPT Logo" className="h-20 w-20" /></a>
        

        {/* Buttons */}
        
          <div className= "">
            <div className="flex justify-center gap-6  py-3 text-sm">
                <a  href="#" className=" text-lg font-bold cursor-pointer text-gray-700 hover:text-[#333D79]  hover:rounded-full hover:scale-110 transition-all duration-250">Accueil</a>
                <a  href="#" className=" text-lg font-bold cursor-pointer text-gray-700 hover:text-[#333D79]  hover:rounded-full hover:scale-110 transition-all duration-250">Brochure</a>
                <a  href="#" className=" text-lg font-bold cursor-pointer text-gray-700 hover:text-[#333D79]  hover:rounded-full hover:scale-110 transition-all duration-250">Statistique</a>
                <a  href="#" className=" text-lg font-bold cursor-pointer text-gray-700 hover:text-[#333D79]  hover:rounded-full hover:scale-110 transition-all duration-250">Contactez-nous</a>
                <a  href ="Calendar" element={<Calendar />} className=" text-lg font-bold cursor-pointer text-gray-700 hover:text-[#333D79]  hover:rounded-full hover:scale-110 transition-all duration-250">Calendar</a>  

            </div>
          </div>

          <button className="bg-[#333D79] text-white px-4 py-1  rounded-full " onClick={handleDialogConn}>Espace Médecin</button>

        
      </div>
      </nav>

      {/* Modal pour etablir une connexion avec le medecin */}
      <Dialog open={isOpen} onClose={handleDialogConn} className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true"></div>

        {/* Dialog Panel */}
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
          <h2 className="text-xl font-bold mb-4">Connexion Espace Médecin</h2>
          <form>
            <label className="block mb-2">Courriel ou identifiant *</label>
            <input type="text" className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">Mot de passe *</label>
            <input type="password" className="w-full p-2 border rounded mb-4" />

            <a href="#" className="text-blue-600 text-sm">
              Réinitialiser votre mot de passe
            </a>

            <div className="mt-4 flex justify-between">
              <button type="button" className="bg-[#333D79] text-white px-4 py-2 rounded" onClick={handleDialogConn}>
                Se connecter
              </button>
              <button type="button" className="text-gray-600 px-4 py-2" onClick={handleDialogConn}>
                Annuler
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>    
      </>
    
  );
};

export default NavBar;
