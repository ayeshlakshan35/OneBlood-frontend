import React from "react";

export default function BloodSummary({ summary }) {
  // Handle case where summary is undefined or null
  if (!summary || typeof summary !== 'object') {
    return (
      <section className="bg-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto my-10">
        <h2 className="text-2xl font-extrabold text-center text-black mb-8">
          Overall Blood Summary
        </h2>
        <div className="text-center text-gray-500">
          No blood data available
        </div>
      </section>
    );
  }

  const summaryEntries = Object.entries(summary);
  
  if (summaryEntries.length === 0) {
    return (
      <section className="bg-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto my-10">
        <h2 className="text-2xl font-extrabold text-center text-black mb-8">
          Overall Blood Summary
        </h2>
        <div className="text-center text-gray-500">
          No blood data available
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto my-10">
      <h2 className="text-2xl font-extrabold text-center text-black mb-8">
        Overall Blood Summary
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {summaryEntries.map(([type, units]) => (
          <div
            key={type}
            className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 text-center font-semibold py-6 px-4 rounded-2xl shadow hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="text-xl font-bold mb-1">{type}</div>
            <div className="text-lg">{units} units</div>
          </div>
        ))}
      </div>
    </section>
  );
}
