import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { getToken } from '../Security&Auth/authUtils';

import { API_BASE_URL } from '../../config';

const NewsItem = ({ title, date, location, imagePath, description }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleConsulterClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <motion.div
            className="relative bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Fenêtre d'information AU-DESSUS */}
            {showDetails && (
                <div className="absolute inset-0 bg-white z-10 p-4 rounded-lg shadow-xl flex flex-col justify-center items-start space-y-2 border border-gray-300">
                    <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
                    <p className="text-sm text-gray-600"><strong>Date :</strong> {new Date(date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600"><strong>Lieu :</strong> {location}</p>
                    <p className="text-sm text-gray-700"><strong>Description :</strong> {description}</p>
                    <button
                        onClick={handleConsulterClick}
                        className="mt-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded font-medium hover:from-green-500 hover:to-blue-500 transition"
                    >
                        Fermer
                    </button>
                </div>
            )}

            {/* Contenu principal de la carte */}
            <div className={showDetails ? "opacity-20 pointer-events-none select-none" : ""}>
                {imagePath && (
                    <img 
                        src={`${API_BASE_URL}/api/actualites/images/${imagePath}`} 
                        alt={title} 
                        className="w-full h-48 object-cover rounded-md" 
                        onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                )}
                <h3 className="text-xl font-semibold mt-4">{title}</h3>
                <p className="text-gray-600 text-sm">{new Date(date).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm">{location}</p>
            </div>

            <button
                onClick={handleConsulterClick}
                className={`mt-4 bg-[#2D3E50] text-white p-2 rounded font-medium hover:from-green-500 hover:bg-green-300 text-black ${showDetails ? 'hidden' : ''}`}
            >
                Voir Plus
            </button>
        </motion.div>
    );
};

const ActualiteComp = () => {
    const [actualites, setActualites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActualites = async () => {
            try {
                const token = getToken();
    
                const response = await axios.get(`${API_BASE_URL}/api/actualites`);

    
                setActualites(response.data);
            } catch (err) {
                setError(err.message);
                console.error("Erreur lors de la récupération des actualités:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchActualites();
    }, []);
    

    if (loading) return <div className="text-center py-12">Chargement en cours...</div>;
    if (error) return <div className="text-center py-12 text-red-500">Erreur: {error}</div>;

    return (
        <section className="max-w-screen-xl mx-auto px-6 py-6 pb-24">
            <div className="flex flex-col items-center space-x-2 pb-4">
                <span className="text-3xl font-bold mb-2 text-gray-700 ">
                    Notre Actualité
                </span>
                <div className="bg-[#333D79] flex items-center justify-center w-16 h-1 mt-2 rounded-full"></div>
            </div>
            
            {actualites.length > 0 ? (
                <Swiper
                    className="mySwiper py-12"
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    grabCursor={true}
                    slidesPerView={3}
                    speed={400}
                    spaceBetween={20}
                    breakpoints={{
                        500: { slidesPerView: 1 },
                        700: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                >
                    {actualites.map((item) => (
                        <SwiperSlide key={item.id}>
                            <NewsItem 
                                title={item.title}
                                date={item.date}
                                location={item.location}
                                imagePath={item.imagePath}
                                description={item.description}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="text-center py-12">Aucune actualité disponible</div>
            )}

            {/* Custom Styles for Swiper Arrows */}
            <style jsx>{`
                :global(.swiper-button-next),
                :global(.swiper-button-prev) {
                    color: black !important;
                }
            `}</style>
        </section>
    );
};

export default ActualiteComp;
