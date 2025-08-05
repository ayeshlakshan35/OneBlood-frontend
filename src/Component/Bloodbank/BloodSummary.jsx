import React from "react";
import HeroSection from "../Home/HeroSection";

export default function BloodSummary({ summary }) {
  // Handle case where summary is undefined or null
  if (!summary || typeof summary !== 'object') {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-12 max-w-6xl mx-auto my-10 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
          <p className="text-gray-500">Blood donation statistics will appear here</p>
        </div>
      </div>
    );
  }

  const summaryEntries = Object.entries(summary);
  
  if (summaryEntries.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-12 max-w-6xl mx-auto my-10 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
          <p className="text-gray-500">Blood donation statistics will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-12 max-w-6xl mx-auto my-10 shadow-2xl">
     

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {summaryEntries.map(([type, units], index) => (
          <div
            key={type}
            className="group relative bg-gradient-to-br from-red-50 to-white border border-red-100 text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-2xl font-bold text-gray-800 mb-2">{type}</div>
              <div className="text-lg font-semibold text-red-600">{units} units</div>
            </div>
            
            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-300 transition-colors duration-300"></div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
}
