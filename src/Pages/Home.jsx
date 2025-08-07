import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Login from '../Pages/Login';
import Services from '../Component/Home/Services';
import Footer from '../Component/Footer/Footer';
import BloodSummary from '../Component/Bloodbank/BloodSummary';
import axiosInstance from '../axiosInstance';

export default function Home() {
  const [bloodSummary, setBloodSummary] = useState({});
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-red-50 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main content wrapper with proper top padding */}
      <main className="pt-24 relative z-0">
        
        {/* Enhanced Hero Section with Background Image */}
        <div className="-mt-24 pt-24">
          <section 
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(220, 38, 127, 0.7), rgba(239, 68, 68, 0.7)), url('/bf.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Floating Blood Drops */}
              <div className="absolute top-20 left-10 text-white opacity-20 text-6xl animate-bounce" style={{animationDelay: '0s'}}>🩸</div>
              <div className="absolute top-40 right-20 text-white opacity-15 text-4xl animate-pulse" style={{animationDelay: '2s'}}>❤️</div>
              <div className="absolute bottom-40 left-20 text-white opacity-20 text-5xl animate-bounce" style={{animationDelay: '1s'}}>🏥</div>
              <div className="absolute bottom-20 right-32 text-white opacity-15 text-6xl animate-pulse" style={{animationDelay: '3s'}}>🩺</div>
              <div className="absolute top-1/3 left-1/3 text-white opacity-10 text-8xl animate-pulse" style={{animationDelay: '1.5s'}}>+</div>
              <div className="absolute top-2/3 right-1/4 text-white opacity-10 text-8xl animate-pulse" style={{animationDelay: '2.5s'}}>+</div>
              
              {/* Geometric Shapes */}
              <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Hero Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
                  <span className="inline-block animate-pulse">One</span>
                  <span className="text-yellow-300 inline-block ml-4 animate-bounce" style={{animationDelay: '0.5s'}}>Blood</span>
                </h1>
                <p className="text-2xl md:text-3xl mb-8 text-red-100 max-w-4xl mx-auto leading-relaxed">
                  Connecting hearts, saving lives across Sri Lanka. 
                  <span className="block mt-2 text-yellow-200 font-semibold">Every drop counts, every donor matters.</span>
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <button className="group px-10 py-5 bg-white text-red-600 rounded-3xl font-bold text-xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center">
                    <span className="mr-3 text-2xl group-hover:animate-pulse">🩸</span>
                    Donate Blood
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                  <button className="group px-10 py-5 border-3 border-white text-white rounded-3xl font-bold text-xl hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-110 flex items-center">
                    <span className="mr-3 text-2xl group-hover:animate-spin">🔍</span>
                    Find Blood
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-50"></path>
              </svg>
            </div>
          </section>
        </div>

        {/* Impact Stats Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-red-50 -mt-1">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Our Impact</h2>
              <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: '🏥', number: '500+', label: 'Partner Hospitals', color: 'from-blue-500 to-blue-700' },
                { icon: '🩸', number: '10,000+', label: 'Lives Saved', color: 'from-red-500 to-red-700' },
                { icon: '❤️', number: '25,000+', label: 'Happy Donors', color: 'from-pink-500 to-pink-700' },
                { icon: '⏰', number: '24/7', label: 'Emergency Support', color: 'from-green-500 to-green-700' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-gray-100 ${isVisible ? 'animate-pulse' : ''}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blood Summary Section with Enhanced Design */}
        <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-white to-red-50 relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-pink-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-6">
                Real-Time Blood Statistics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Live data from our network of hospitals and blood banks across Sri Lanka
              </p>
            </div>
            
            <div className="overflow-hidden transform hover:scale-[1.02] transition-all duration-500 rounded-3xl relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"></div>
              <div
                className="relative z-10 border-2 border-red-100 shadow-2xl bg-cover bg-center rounded-3xl overflow-hidden backdrop-blur-sm"
                style={{ 
                  backgroundImage: "linear-gradient(rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.1)), url('/bggg.jpg')"
                }}
              >
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 px-10 py-8 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-3">Blood Donation Network</h3>
                        <p className="text-red-100 text-lg">Updated every 5 minutes</p>
                      </div>
                      <div className="text-white text-5xl animate-pulse">
                        📊
                      </div>
                    </div>
                  </div>
                  <div className="p-10 bg-white bg-opacity-95 backdrop-blur-sm">
                    <BloodSummary summary={bloodSummary} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-40 w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-60 left-60 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 right-20 w-4 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-60 left-40 w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold mb-6">How It Works</h2>
              <div className="w-32 h-2 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  step: '01', 
                  icon: '🔍', 
                  title: 'Search Blood', 
                  description: 'Find available blood types in hospitals near you',
                  color: 'from-blue-500 to-blue-700'
                },
                { 
                  step: '02', 
                  icon: '📞', 
                  title: 'Contact Hospital', 
                  description: 'Get in touch with the hospital directly for availability',
                  color: 'from-green-500 to-green-700'
                },
                { 
                  step: '03', 
                  icon: '❤️', 
                  title: 'Save Lives', 
                  description: 'Help someone in need and make a difference',
                  color: 'from-red-500 to-red-700'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group text-center transform hover:scale-105 transition-all duration-500"
                >
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-4xl text-white mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-2xl`}>
                      {item.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-red-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-40 left-10 w-32 h-32 bg-red-500 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-40 right-10 w-40 h-40 bg-pink-500 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-red-600 mb-6">
                Our Services
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive blood donation services designed to save lives and build healthier communities
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2">
                <div className="bg-white rounded-2xl p-8">
                  <Services />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 text-white opacity-10 text-6xl animate-bounce">🩸</div>
            <div className="absolute top-20 right-20 text-white opacity-10 text-4xl animate-pulse">❤️</div>
            <div className="absolute bottom-20 left-20 text-white opacity-10 text-5xl animate-bounce" style={{animationDelay: '1s'}}>🏥</div>
            <div className="absolute bottom-10 right-10 text-white opacity-10 text-6xl animate-pulse" style={{animationDelay: '2s'}}>+</div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl font-extrabold mb-6">Ready to Make a Difference?</h2>
            <p className="text-2xl text-red-100 mb-10 leading-relaxed">
              Join thousands of heroes who are saving lives every day. Your contribution matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-12 py-5 bg-white text-red-600 rounded-3xl font-bold text-xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center justify-center">
                <span className="mr-3 text-2xl group-hover:animate-bounce">🎯</span>
                Get Started Today
                <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
              </button>
              <button className="group px-12 py-5 border-3 border-white text-white rounded-3xl font-bold text-xl hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center">
                <span className="mr-3 text-2xl group-hover:animate-spin">📞</span>
                Contact Us
              </button>
            </div>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <Footer />
      </footer>
    </div>
  );
}