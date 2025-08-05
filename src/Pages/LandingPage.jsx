import React from 'react';
import { useNavigate } from 'react-router-dom';
import home1 from '../assets/home1.png';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/Login');
  };

  return (
    <div className="min-h-screen bg-gray-50 opacity-95">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center">
        {/* Text Content - Left Side */}
        <div className="w-1/2 px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-red-600">OneBlood</span> – Saving Lives Starts with You
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Connect blood donors with those in need. Our platform makes it easy to donate blood, 
              find available blood types, and locate donation camps near you.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300"
            >
              Get Started Now
            </button>
          </div>
        </div>
        
        {/* Image - Right Side */}
        <div className="w-1/2 h-screen relative">
          <div 
            className="w-full h-full opacity-90"
            style={{
              backgroundImage: `url(${home1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Getting started with OneBlood is simple. Follow these three easy steps to begin your life-saving journey.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {/* Step 1 */}
            <div className="w-full sm:w-[45%] lg:w-[30%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-center">Create an Account</h3>
              <p className="text-sm">
                Sign up with your basic information and verify your identity. It only takes a few minutes to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="w-full sm:w-[45%] lg:w-[30%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-center">Donate or Request Blood</h3>
              <p className="text-sm">
                Choose to donate blood to help others or request blood when you need it. Our platform connects you instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="w-full sm:w-[45%] lg:w-[30%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-center">Track Nearby Hospitals & Camps</h3>
              <p className="text-sm">
                Find the nearest hospitals, blood banks, and donation camps. Real-time updates keep you informed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose OneBlood Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose OneBlood?</h2>
            <p className="text-xl text-gray-600">
              We're committed to making blood donation safe, reliable, and accessible for everyone in our community.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {/* Trusted Donors */}
            <div className="w-full sm:w-[45%] lg:w-[22%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Trusted Donors</h3>
              <p className="text-sm">
                All donors are verified and screened to ensure the highest safety standards for blood donation.
              </p>
            </div>

            {/* Real-time Availability */}
            <div className="w-full sm:w-[45%] lg:w-[22%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Real-time Availability</h3>
              <p className="text-sm">
                Live updates on blood availability across hospitals and blood banks in your area.
              </p>
            </div>

            {/* Government Approved */}
            <div className="w-full sm:w-[45%] lg:w-[22%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Government Approved</h3>
              <p className="text-sm">
                Officially recognized and approved by health authorities for safe blood donation practices.
              </p>
            </div>

            {/* 24/7 Emergency Support */}
            <div className="w-full sm:w-[45%] lg:w-[22%] bg-red-50 border border-red-200 rounded-2xl p-6 text-center hover:bg-red-700 hover:text-white transition duration-300 shadow-md hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">24/7 Emergency Support</h3>
              <p className="text-sm">
                Round-the-clock support for emergency blood requests and urgent medical situations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of heroes who are already saving lives through blood donation. Every donation counts.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            <span className="mr-2">→</span>
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
} 