import React from "react";

export default function BloodHistory({ history }) {
  if (!history || !Array.isArray(history)) {
    return (
      <section className="bg-white shadow-xl rounded-2xl p-8 max-w-5xl mx-auto my-10">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-6">
          Blood Unit History
        </h2>
        <p className="text-gray-500 text-center text-lg">No blood history available.</p>
      </section>
    );
  }

  return (
    <section className="bg-white shadow-xl rounded-2xl p-8 max-w-5xl mx-auto my-10">
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-6">
        Blood Unit History
      </h2>

      <div className="space-y-5 max-h-[28rem] overflow-y-auto pr-2 
        scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-200">
        
        {history.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No blood history available.</p>
        ) : (
          history.map((entry, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm border border-red-100 transition-transform transform hover:scale-[1.02] hover:shadow-md"
            >
              <p className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                🏥 Blood Entry —{" "}
                <span className="text-gray-600 font-normal">
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div className="flex justify-between items-center bg-red-100 text-red-800 px-4 py-3 rounded-lg shadow-sm font-medium">
                  <span className="font-bold text-lg">{entry.bloodType}</span>
                  <span className="text-base">{entry.units} units</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
