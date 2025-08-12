import React, { useEffect, useState } from "react";
import Footer from '../Component/Footer/Footer';
import Navbar from "../Component/Navbar/Navbar";
import axiosInstance from "../axiosInstance";

export default function Camp() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axiosInstance.get("/camp/all-camps");
        setCamps(response.data.camps);
      } catch (err) {
        console.error("Error fetching all camps:", err);
        alert("Failed to load all camps");
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <Navbar />
      


      {/* Campaigns Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Active Campaigns
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our current blood donation campaigns and find one near you
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-red-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
          </div>
        ) : camps.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl mb-2">No campaigns available right now</p>
            <p className="text-gray-400">Check back soon for new blood donation campaigns</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {camps.map((camp, index) => (
              <div 
                key={camp._id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 hover:-translate-y-2 h-96"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex h-full">
                  {/* Image Section */}
                  <div className="relative w-1/2 bg-gradient-to-br from-red-100 to-pink-100 overflow-hidden">
                    {camp.documentPath && (
                      camp.documentPath.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? (
                        <img
                          src={`http://localhost:5000/${camp.documentPath}`}
                          alt="Campaign Document"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-colors">
                              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <a
                              href={`http://localhost:5000/${camp.documentPath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors inline-block px-3 py-1 rounded-lg hover:bg-white/50"
                            >
                              View Document
                            </a>
                          </div>
                        </div>
                      )
                    )}
                    {!camp.documentPath && (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="w-16 h-16 bg-gray-200/50 rounded-2xl flex items-center justify-center group-hover:bg-gray-300/50 transition-colors">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                      <div className="text-center">
                        <div className="text-sm leading-none">{new Date(camp.date).toLocaleDateString()}</div>
                        {camp.time && (
                          <div className="text-xs opacity-90 mt-1 leading-none">{camp.time}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Details Section */}
                  <div className="w-1/2 p-6 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50/50">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
                        {camp.title}
                      </h3>
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center group/item hover:bg-red-50 p-2 -mx-2 rounded-lg transition-colors">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium text-sm truncate">{camp.hospital}</span>
                        </div>
                        
                        <div className="flex items-center group/item hover:bg-red-50 p-2 -mx-2 rounded-lg transition-colors">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium text-sm truncate">{camp.location}</span>
                        </div>
                        
                        <div className="flex items-start group/item hover:bg-red-50 p-2 -mx-2 rounded-lg transition-colors">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3 mt-0 group-hover/item:bg-red-200 transition-colors flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <span className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{camp.description}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600 flex-1 mr-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium truncate">{camp.contact}</span>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-400 {
          animation-delay: 400ms;
        }
        
        .delay-600 {
          animation-delay: 600ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}