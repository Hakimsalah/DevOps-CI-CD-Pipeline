import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../Security&Auth/authUtils"; // ajuste le chemin si nécessaire

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const token = getToken();
        const response = await axios.get("/api/faqs/");
        setFaqs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des FAQ:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions Fréquentes</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`w-full px-4 py-4 text-sm font-semibold bg-[#2D3E50] text-white flex justify-between items-center cursor-pointer transition-colors duration-200 hover:bg-green-300 text-black ${
                  openIndex === index ? "bg-green-300 text-black" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.question}</span>
                <span className="text-xl">{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <div className="bg-gray-100 p-4 text-gray-700">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
