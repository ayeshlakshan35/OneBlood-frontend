import React from "react";

export default function BloodHistory({ history }) {
  // Handle case where history is undefined or null
  if (!history || !Array.isArray(history)) {
    return (
      <section className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto my-10">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
           Blood Unit History
        </h2>
        <p className="text-gray-500 text-center">No blood history available.</p>
      </section>
    );
  }

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto my-10">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
         Blood Unit History
      </h2>

      <div className="space-y-5 max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-gray-200">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No blood history available.</p>
        ) : (
          history.map((entry, i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-xl shadow-sm border border-red-100">
              <p className="text-sm font-semibold text-red-700 mb-2">
                🏥 Blood Entry —{" "}
                <span className="text-gray-600">
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <div className="flex justify-between items-center bg-red-100 text-red-800 px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-bold">{entry.bloodType}</span>
                  <span className="font-medium">{entry.units} units</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
