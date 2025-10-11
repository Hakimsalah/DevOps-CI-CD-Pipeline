import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Footer from '../footer/footer';
import ChatBot from "../ChatBot/ChatBot";
import "tailwindcss/tailwind.css";
import image from "../../assets/arriere_us1.jpg";
import { getToken } from "../Security&Auth/authUtils";
import { API_BASE_URL } from "../../config";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" });
          setErrors({});
        } else {
          alert("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Contenu principal avec arrière-plan */}
      <div className="flex-grow relative mt-[48px]">
        <img 
          src={image} 
          alt="Background" 
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" 
        />
        
        <div className="p-4 pt-20 w-full">
          <br/><br/><br/><br/><br/>
          <h1 className="text-4xl font-bold text-center text-[#333D79] mb-8">Contactez-Nous</h1>
          <div className="bg-green bg-opacity-90 shadow-lg rounded-lg p-8 max-w-4xl mx-auto flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 pr-4 pt-20">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded mb-2"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded mb-2"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Numbers"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded mb-2"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                <textarea
                  name="message"
                  placeholder="Type Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded mb-2"
                  rows="4"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                
                <button 
                  onClick={handleSubmit}
                  type="submit" 
                  className="w-full bg-[#333D79] text-white p-3 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
            
            <div className="w-full md:w-1/3 bg-[#333D79] text-white p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Contactez nous pour n'importe quelle information</h2>
              <p className="mb-2"><strong>Localisation:</strong>13, rue Djebel Lakhdhar Bab Saadoun-Tunis-1006</p>
              <p className="mb-2"><strong>Email & Phone:</strong> Centredegreffe@gmail.com, (+216)71 568 903</p>
              <p className="mb-2"><strong>Suivez-nous:</strong></p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
                <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
                <a href="#" className="hover:text-gray-300"><FaLinkedin /></a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-green bg-opacity-90 shadow-lg p-6 rounded-lg text-center">
              <FaPhoneAlt className="text-3xl text-blue-500 mx-auto mb-2 hover:animate-bounce" />
              <p className="text-lg font-semibold text-[#333D79]">Numéro de Tel</p>
              <p>(+216)71 568 903</p>
              
            </div>
            <div className="bg-green bg-opacity-90 shadow-lg p-6 rounded-lg text-center">
              <FaEnvelope className="text-3xl text-red-500 mx-auto mb-2 hover:animate-bounce" />
              <p className="text-lg font-semibold text-[#333D79]">Adresse Mail </p>
              <p>Centredegreffe@gmail.com</p>
            
            </div>
            <div className="bg-green bg-opacity-90 shadow-lg p-6 rounded-lg text-center">
              <FaMapMarkerAlt className="text-3xl text-green-500 mx-auto mb-2 hover:animate-bounce" />
              <p className="text-lg font-semibold text-[#333D79]">Addresse</p>
              <p>13, rue Djebel Lakhdhar Bab Saadoun-Tunis-1006</p>
            </div>
          </div>
        </div>
        
        <ChatBot />
      </div>
      
      {/* Footer en pleine largeur */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ContactForm;