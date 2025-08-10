import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import home1 from "../../assets/home1.png";
import im1 from "../../assets/im1.png";
import im2 from "../../assets/im2.png";
import im3 from "../../assets/im3.png";
import im4 from "../../assets/im4.png";

const images = [home1, im1, im2, im3, im4];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleBecomeDonor = () => {
    navigate("/DBlood");
  };

  const handleFindBlood = () => {
    navigate("/FBlood");
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Images with fade effect */}
      <div className="absolute inset-0 z-0">
        {images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Slide ${index + 1}`}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
            loading="lazy"
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-end min-h-screen px-8 lg:px-16">
        <div className="max-w-xl text-right">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              <span className="text-white drop-shadow-lg">
                  Donate <span className="relative">
                      Blood
                        <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                      </span>,
                 </span>{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(239,68,68,0.8)] animate-pulse">
               Save Lives
            </span>
            </h1>

  <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
    Every drop counts. Be a hero today — your donation can give someone a tomorrow.
  </p>

  
</div>



          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
            <button
              onClick={handleBecomeDonor}
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 hover:scale-105 transition-all duration-200 shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Navigate to become a donor page"
            >
              Become a Donor
            </button>
            <button
              onClick={handleFindBlood}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-200 shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Navigate to find blood page"
            >
              Find Blood
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
