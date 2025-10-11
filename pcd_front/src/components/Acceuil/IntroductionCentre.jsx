import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import path from "../../assets/introductionCentre.jpg" ;



const IntroductionCentre = ()=>{

    const { scrollY } = useScroll();
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const updateBlur = () => {
      setBlur(Math.min(scrollY.get() / 50, 10)); // Flou dynamique (max 10px)
    };

    const unsubscribe = scrollY.onChange(updateBlur);
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Section Accueil */}
      <section className="w-full p-10 bg-white">
        <h2 className="text-3xl font-bold mb-2 text-gray-700 ">Bienvenu au CNGMO </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-4">  
        Chères consœurs, chers confrères,

      C’est avec un immense plaisir que je vous accueille sur le nouveau site web de notre Centre , conçu pour répondre à vos attentes et refléter les évolutions contemporaines.
        
        </p>
      </section>

      {/* Image Dynamique */}
      <motion.div
        className="w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${path})`,
          filter: `blur(${blur}px)`,
        }}
      ></motion.div>

      {/* Section Missions et Attributions */}
      <section className="w-full p-10 bg-white">
        <h2 className="text-3xl font-bold mb-2 text-gray-700 ">Introduction </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-4">
        Le centre de greffe a été créé en 1994 est situé à Tunis dans le quartier de Bâb Saadoun. Il intervient dans la gestion des hémato pathologies et toutes les manifestations de transplantation de moelle osseuse, relatives aux maladies hématologiques. Le service d’hématologie pédiatrique dans le centre prend en charge les hémoglobinopathies et autres anémies hémolytiques. 
        Plus de 600 patients sont traités, recevant tous les soins nécessaires (transfusion sanguine, la chélation du fer, etc.)
        </p>
      </section>
    </div>
  );
};
export default IntroductionCentre;