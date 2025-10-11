import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { API_BASE_URL } from '../../config';

const Membre_projet_def = () => {
  const [openBio, setOpenBio] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [membres, setMembres] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/membre_proj/all`) // ← remplace avec ton vrai backend URL si besoin
      .then(res => setMembres(res.data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  const handleBio = () => {
    setOpenBio(!openBio);
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? membres.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev === membres.length - 1 ? 0 : prev + 1
    );
  };

  if (membres.length === 0) {
    return  <p>Loading...</p>;  
  }

  const membre = membres[currentIndex];

  return (
    <div className="relative w-full bg-[#333D79] p-10">
      <h2 className="text-2xl text-white font-bold text-center mb-6">Notre Équipe</h2>

      <div className="relative flex items-center justify-center overflow-hidden">
        <button onClick={prevSlide} className="absolute left-2 p-2 text-white bg-gray-700 rounded-full hover:bg-gray-600">
          <ChevronLeft size={24} />
        </button>

        <div className="w-[400px] h-[350px] flex justify-center overflow-hidden" onClick={handleBio}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-5 text-center w-full flex flex-col items-center"
          >
            <img
              src={`${API_BASE_URL}/uploads/${membre.imgPath}`} 
              alt={membre.nom}
              className="w-1/2 rounded-full mb-4 object-cover cursor-pointer hover:scale-105 transition-transform"
            />
            <h3 className="text-xl font-bold ">{membre.nom}</h3>
            <p className="text-gray-600">{membre.profession}</p>
            <br />
            <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <a href={membre.linkFb}   target="_blank" rel="noopener noreferrer"  className="hover:text-gray-300"><FaFacebook /></a>
              <a href={membre.linkInsta} target="_blank" className="hover:text-gray-300"><FaInstagram /></a>
              <a href={membre.linkLin} target="_blank" className="hover:text-gray-300"><FaLinkedin /></a>
            </div>
          </motion.div>
        </div>

        <button onClick={nextSlide} className="absolute right-2 p-2 text-white bg-gray-700 rounded-full hover:bg-gray-600">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Modal for Bio */}
      <AnimatePresence>
        {openBio && (
          <Dialog open={openBio} onClose={() => setOpenBio(false)} className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="bg-black bg-opacity-30 fixed inset-0"
              onClick={() => setOpenBio(false)}
            ></motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50 max-h-screen overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-2 text-center">{membre.nom}</h3>
              <p className="text-gray-600">{membre.bio}</p>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Membre_projet_def;
