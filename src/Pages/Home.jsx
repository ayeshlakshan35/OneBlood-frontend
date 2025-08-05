import React, { useState, useEffect } from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Login from '../Pages/Login'
import Services from '../Component/Home/Services'
import Footer from '../Component/Footer/Footer'
import BloodSummary from '../Component/Bloodbank/BloodSummary'
import axiosInstance from '../axiosInstance'
import HeroSection from '../Component/Home/HeroSection' 


export default function Home() {
  const [bloodSummary, setBloodSummary] = useState({});

  const fetchBloodSummary = async () => {
    try {
      const response = await axiosInstance.get("/bloodroutes/summary");
      setBloodSummary(response.data || {});
      console.log("🔍 Debug - Blood summary fetched for home page:", response.data);
    } catch (error) {
      console.error("❌ Error fetching blood summary:", error);
      // Don't show error to users, just set empty summary
      setBloodSummary({});
    }
  };

  useEffect(() => {
    fetchBloodSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <Navbar />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Blood Summary Section */}
        <div className="py-16 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
                <h2 className="text-3xl font-bold text-white mb-2">Blood Donation Statistics</h2>
                <p className="text-red-100">Real-time data from our blood donation network</p>
              </div>
              <div className="p-8">
                <BloodSummary summary={bloodSummary} />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section with modern styling */}
        <div className="py-16 px-4 lg:px-8 bg-gradient-to-b from-transparent to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <Services/>
            </div>
          </div>
        </div>

        {/* Footer with modern styling */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
          <Footer/>
        </div>
    </div>
  )
}
