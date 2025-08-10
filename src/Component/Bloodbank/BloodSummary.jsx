import React from "react";
import HeroSection from "../Home/HeroSection";

export default function BloodSummary({ summary }) {
  // Handle case where summary is undefined or null
  if (!summary || typeof summary !== 'object') {
    return (
      <div className="relative bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-3xl p-12 max-w-6xl mx-auto my-10 shadow-xl overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-100/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-100/40 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-red-700 mb-3">
            No Data Available
          </h3>
          <p className="text-red-600 text-lg">Blood donation statistics will appear here</p>
          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const summaryEntries = Object.entries(summary);
  
  if (summaryEntries.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-3xl p-12 max-w-6xl mx-auto my-10 shadow-xl overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-100/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-100/40 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-red-700 mb-3">
            No Data Available
          </h3>
          <p className="text-red-600 text-lg">Blood donation statistics will appear here</p>
          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  // Blood type colors using only red variations
  const bloodTypeColors = [
    { bg: 'from-red-500 to-red-600', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-600 to-red-700', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-700 to-red-800', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-400 to-red-500', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-300 to-red-400', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-200 to-red-300', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-800 to-red-900', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
    { bg: 'from-red-900 to-red-950', card: 'from-red-50 to-white', border: 'border-red-200', text: 'text-red-800' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-3xl p-12 max-w-6xl mx-auto my-10 shadow-xl overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-100/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-red-100/20 to-red-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.69 2 6 4.69 6 8c0 1.5.5 2.87 1.36 3.98L12 21l4.64-9.02C17.5 10.87 18 9.5 18 8c0-3.31-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-black mb-3">
          Blood Donation Summary
        </h2>
        <p className="text-red-600 text-lg max-w-2xl mx-auto">
          Track and monitor blood donation statistics across different blood types
        </p>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto"></div>
      </div>

      {/* Enhanced Statistics Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {summaryEntries.map(([type, units], index) => {
          const colorScheme = bloodTypeColors[index % bloodTypeColors.length];
          
          return (
            <div
              key={type}
              className={`group relative bg-gradient-to-br ${colorScheme.card} border ${colorScheme.border} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer overflow-hidden`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Floating Background Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Blood Type Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${colorScheme.bg} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l-2 7h6l-2-7zm0 9c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-red-800 group-hover:text-red-900 transition-colors duration-300">
                    {type}
                  </h3>
                  <div className={`text-3xl font-extrabold ${colorScheme.text} group-hover:scale-110 transition-transform duration-300`}>
                    {units}
                  </div>
                  <p className="text-sm text-red-600 font-medium">
                    Units Available
                  </p>
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorScheme.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Border Glow */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/50 transition-all duration-300`}></div>
            </div>
          );
        })}
      </div>
      
      {/* Bottom Decoration */}
      <div className="relative z-10 mt-12 flex justify-center">
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}