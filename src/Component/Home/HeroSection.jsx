import React from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../../assets/home1.png";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleBecomeDonor = () => {
    navigate('/DBlood');
  };

  const handleFindBlood = () => {
    navigate('/FBlood');
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-[80px]">
      {/* Background Image */}
      <div className="absolute opacity-80 inset-0">
        <img 
          src={homeImage} 
          alt="Blood donation" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-end min-h-screen px-8 lg:px-16">
        <div className="opacity-80 max-w-xl text-right">
          <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Donate Blood, <span className="text-red-600">Save Lives</span>
          </h1>
         
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button 
              onClick={handleBecomeDonor}
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200 shadow-sm text-lg cursor-pointer"
            >
              Become a Donor
            </button>
            <button 
              onClick={handleFindBlood}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-sm text-lg cursor-pointer"
            >
              Find Blood
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
