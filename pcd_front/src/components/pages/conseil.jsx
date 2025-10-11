import React, { useState } from 'react';
import handnet from "../../assets/handnet.jpg";
import gel from "../../assets/gel.jpg";
import bavette from "../../assets/bavette.jpg";
import Éviter from "../../assets/Éviter le contact avec les malades.jpg";
import jetter from "../../assets/jetter.jpg";
import repas from "../../assets/Utilisation des repas stériles.png";

const Conseil = () =>
{

    const visitorAdvice = [
        { title: "Hygiène des mains", description: "Lavez-vous les mains régulièrement avec du savon ou utilisez un gel hydroalcoolique.", image: handnet },
        { title: "Désinfection des surfaces", description: "Utilisez des désinfectants adaptés pour nettoyer les surfaces fréquemment touchées.", image: gel },
        { title: "Protection des personnes immunodéprimées", description: "Évitez tout contact avec des personnes malades et portez un masque si nécessaire.", image: bavette },
        { title: "Éviter le contact avec les malades", description: "Évitez le contact avec d'autres patients malades pour réduire le risque de contamination.", image: Éviter },
        { title: "Gestion des repas", description: "Évitez de partager la nourriture avec d'autres personnes.", image: jetter },
        { title: "Utilisation des repas stériles", description: "En cas d'ouverture de l'emballage de repas stérile, il ne faut pas dépasser une heure.", image: repas },
      ];

    return (
        <div className="w-screen bg-gray-50 py-12">
        <div className="mx-auto px-6">
          <h3 className="text-xl font-bold text-green-500 mb-4">Conseils pour les visiteurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitorAdvice.map((advice, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-green-50 hover:border-2 hover:border-green-500">
                <img src={advice.image} alt={advice.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h4 className="text-lg font-semibold text-gray-800">{advice.title}</h4>
                <p className="text-gray-600 mt-2">{advice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default Conseil

