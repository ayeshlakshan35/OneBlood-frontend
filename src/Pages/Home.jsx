import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar/Navbar';
import Login from '../Pages/Login';
import Services from '../Component/Home/Services';
import Footer from '../Component/Footer/Footer';
import BloodSummary from '../Component/Bloodbank/BloodSummary';
import axiosInstance from '../axiosInstance';

export default function Home() {
  const [bloodSummary, setBloodSummary] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const fetchBloodSummary = async () => {
    try {
      const response = await axiosInstance.get("/bloodroutes/summary");
      setBloodSummary(response.data || {});
      console.log("🔍 Blood summary fetched:", response.data);
    } catch (error) {
      console.error("❌ Error fetching blood summary:", error);
      setBloodSummary({});
    }
  };

  useEffect(() => {
    fetchBloodSummary();
    setIsVisible(true);
  }, []);

  // Navigation functions
  const handleDonateBloodClick = () => {
    navigate('/DBlood');
  };

  const handleFindBloodClick = () => {
    navigate('/FBlood');
  };

  return (
    <div className="bg-gradient-to-br from-stone-50 via-white to-red-50">
      {/* Sticky Navbar - Fixed positioning */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main content wrapper with proper top padding */}
      <main className="pt-20">
        
        {/* Enhanced Hero Section with Background Image */}
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(156, 69, 69, 0.85), rgba(132, 46, 46, 0.9)), url('/bf.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Medical Icons */}
            <div className="absolute top-20 left-10 text-white opacity-8 text-4xl">🩸</div>
            <div className="absolute top-40 right-20 text-white opacity-6 text-3xl">❤️</div>
            <div className="absolute bottom-40 left-20 text-white opacity-8 text-3xl">🏥</div>
            <div className="absolute bottom-20 right-32 text-white opacity-6 text-3xl">🩺</div>
            <div className="absolute top-1/3 left-1/3 text-white opacity-4 text-6xl">+</div>
            <div className="absolute top-2/3 right-1/4 text-white opacity-4 text-6xl">+</div>
            
            {/* Subtle Geometric Shapes */}
            <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-white opacity-4 rounded-full"></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-white opacity-3 rounded-full"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="inline-block text-white">One</span>
                <span className="text-red-100 inline-block ml-4 font-semibold">Blood</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-stone-100 max-w-4xl mx-auto leading-relaxed">
                Connecting hearts, saving lives across Sri Lanka. 
                <span className="block mt-2 text-red-100 font-medium">Every drop counts, every donor matters.</span>
              </p>
              
              {/* Action Buttons with Navigation */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <button 
                  onClick={handleDonateBloodClick}
                  className="group px-10 py-4 bg-white text-red-800 rounded-lg font-semibold text-lg hover:bg-stone-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center cursor-pointer"
                >
                  <span className="mr-3 text-lg">🩸</span>
                  Donate Blood
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button 
                  onClick={handleFindBloodClick}
                  className="group px-10 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-red-800 transition-all duration-300 transform hover:scale-105 flex items-center cursor-pointer"
                >
                  <span className="mr-3 text-lg">🔍</span>
                  Find Blood
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-stone-50"></path>
            </svg>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-stone-50 to-red-50 -mt-1">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-4">Our Impact</h2>
              <div className="w-24 h-1 bg-red-700 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: '🏥', number: '500+', label: 'Partner Hospitals', color: 'from-stone-600 to-stone-700' },
                { icon: '🩸', number: '10,000+', label: 'Lives Saved', color: 'from-red-700 to-red-800' },
                { icon: '❤️', number: '25,000+', label: 'Happy Donors', color: 'from-rose-700 to-rose-800' },
                { icon: '⏰', number: '24/7', label: 'Emergency Support', color: 'from-amber-600 to-amber-700' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-stone-800 mb-2 group-hover:text-red-700 transition-colors">
                    {stat.number}
                  </h3>
                  <p className="text-stone-600 font-medium text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blood Summary Section with Professional Design */}
        <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-white to-stone-50 relative">
          {/* Subtle Background Decoration */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-20 left-20 w-32 h-32 bg-red-700 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-stone-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-6">
                Real-Time Blood Statistics
              </h2>
              <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                Live data from our network of hospitals and blood banks across Sri Lanka
              </p>
            </div>
            
            <div className="overflow-hidden transform hover:scale-[1.01] transition-all duration-300 rounded-xl relative group">
              <div
                className="relative z-10 border border-stone-200 shadow-xl bg-cover bg-center rounded-xl overflow-hidden"
                style={{ 
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('/bggg.jpg')"
                }}
              >
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-red-800 to-red-700 px-10 py-8 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">Blood Donation Network</h3>
                        <p className="text-red-100 text-base">Real time updating</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-10 bg-white bg-opacity-98">
                    <BloodSummary summary={bloodSummary} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-stone-50 to-red-50 relative">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-40 left-10 w-24 h-24 bg-red-700 rounded-full blur-2xl"></div>
            <div className="absolute bottom-40 right-10 w-32 h-32 bg-stone-500 rounded-full blur-2xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-6">
                Our Services
              </h2>
              <div className="w-24 h-1 bg-red-700 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                Comprehensive blood donation services designed to save lives and build healthier communities
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden transform hover:scale-[1.005] transition-all duration-300">
              <div className="bg-gradient-to-r from-red-800 to-red-700 p-1">
                <div className="bg-white rounded-lg p-8">
                  <Services />
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-stone-900 via-red-900 to-stone-900">
        <Footer />
      </footer>
    </div>
  );
}