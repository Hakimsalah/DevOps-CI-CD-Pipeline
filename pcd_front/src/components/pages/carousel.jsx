import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const slides = [
    { id: 1, text: "Utilisation Correcte Du Gel Hydroalcoolique", video: "/videos/video1.mp4" },
    { id: 2, text: "Nettoyage efficace des surfaces", video: "/videos/video2.mp4" },
    { id: 3, text: "Techniques De Nettoyage Des Mains", video: "/videos/video3.mp4" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative pt-20 w-full h-[650px] overflow-hidden ">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out  ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <video src={slide.video} autoPlay loop muted className="w-full h-full object-cover pt-20" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold uppercase">{slide.text}</h2>
          </div>
        </div>
      ))}

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white"
        onClick={prevSlide}
      >
        <FaArrowLeft />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white"
        onClick={nextSlide}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
