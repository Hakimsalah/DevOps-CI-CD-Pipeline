import React from "react";
import { FaClock, FaLocationArrow, FaPhone, FaFacebookSquare, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const openingHours = [
  ["Lundi", "09:00 - 19:00"],
  ["Mardi", "09:00 - 19:00"],
  ["Mercredi", "09:00 - 19:00"],
  ["Jeudi", "09:00 - 19:00"],
  ["Vendredi", "09:00 - 19:00"],
  ["Samedi", "10:00 - 18:00"],
  ["Dimanche", "Urgence"],
];

const ContactSection = () => {
  return (
    <section className="mx-auto p-6 shadow-lg rounded-lg bg-white my-8">
      <h2 className="text-center text-[#333D79] text-2xl font-bold flex items-center justify-center gap-2">
        <FaClock /> Horaires
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        
        {/* Bloc Informations */}
        <div className="p-4 mx-auto w-3/4">
          <h3 className="text-[#333D79] font-extrabold text-xl">CNGMO</h3>
          <p className="text-gray-600 font-medium mt-2">
            CNGMO est dédié à offrir des services de greffe de haute qualité avec une prise en charge personnalisée et humaine.
          </p>
          
          <address className="not-italic mt-4 text-gray-700">
            <p className="flex items-center gap-2">
              <FaLocationArrow className="text-[#333D79]" /> Beb Saadoun
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-[#333D79]" /> +216 99 999 888
            </p>
          </address>

          <div className="mt-4 flex space-x-4 text-2xl text-[#333D79]">
            <a href="#" aria-label="Facebook" className="hover:opacity-75"><FaFacebookSquare /></a>
            <a href="#" aria-label="Instagram" className="hover:opacity-75"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-75"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Bloc Horaires */}
        <div className="p-4 mx-auto w-3/4">
          <h4 className="text-lg font-bold text-[#333D79] mb-3">Horaires d'ouverture</h4>
          <table className="w-full border rounded-lg overflow-hidden text-gray-700">
            <tbody>
              {openingHours.map(([day, time], index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2 px-4 font-semibold">{day}</td>
                  <td className="py-2 px-4">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};


export default ContactSection;
