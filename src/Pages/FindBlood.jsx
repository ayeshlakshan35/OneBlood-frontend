import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import axiosInstance from "../axiosInstance";

// District list (static)
const districts = [
  "Colombo", "Gampaha", "Kalutara",
  "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota",
  "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
  "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam",
  "Anuradhapura", "Polonnaruwa",
  "Badulla", "Monaragala",
  "Kegalle", "Ratnapura",
];

// Blood types (static)
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function FindBlood() {
  const [allHospitals, setAllHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/bloodroutes/all-hospitals");
        setAllHospitals(res.data);
        setFilteredHospitals(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Error fetching hospital data:", err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allHospitals.filter((hospital) => {
      const matchesBlood = selectedBloodType
        ? hospital.bloodData?.some((b) =>
            b.bloodType.toLowerCase() === selectedBloodType.toLowerCase()
          )
        : true;

      const matchesDistrict = selectedDistrict
        ? hospital.district?.toLowerCase() === selectedDistrict.toLowerCase()
        : true;

      return matchesBlood && matchesDistrict;
    });

    setFilteredHospitals(filtered);
  }, [selectedBloodType, selectedDistrict, allHospitals]);

  return (
    <>
      <style jsx>{`
        /* Keyframe Animations */
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes heartbeat {
          0%, 14%, 28%, 42%, 70% {
            transform: scale(1);
          }
          7%, 21%, 35% {
            transform: scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) rotate(5deg);
          }
          70% {
            transform: scale(0.9) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Page Title Animation */
        .page-title {
          animation: fadeInUp 0.8s ease-out;
        }

        .page-subtitle {
          animation: fadeIn 1s ease-out 0.3s both;
        }

        /* Filter Container Animation */
        .filter-container {
          animation: slideInLeft 0.8s ease-out 0.5s both;
        }

        /* Select Animations */
        .animated-select {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .animated-select:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
        }

        .animated-select:focus {
          transform: scale(1.02);
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        /* Clear Button Animation */
        .clear-button {
          animation: bounceIn 0.6s ease-out;
          transition: all 0.3s ease;
        }

        .clear-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(220, 38, 38, 0.2);
        }

        /* Results Summary Animation */
        .results-summary {
          animation: slideInRight 0.6s ease-out;
        }

        /* Hospital Cards Animation */
        .hospital-card {
          animation: fadeInUp 0.6s ease-out both;
          transition: all 0.4s ease;
        }

        .hospital-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15);
        }

        /* Blood Icon Animation */
        .blood-icon {
          animation: heartbeat 2s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .hospital-card:hover .blood-icon {
          animation: pulse 1s ease-in-out infinite;
          transform: scale(1.1);
        }

        /* Blood Badge Animation */
        .blood-badge {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .blood-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .hospital-card:hover .blood-badge::before {
          left: 100%;
        }

        .blood-badge:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
        }

        /* Loading Animation */
        .loading-shimmer {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }

        /* Staggered Animation for Cards */
        .hospital-card:nth-child(1) { animation-delay: 0.1s; }
        .hospital-card:nth-child(2) { animation-delay: 0.2s; }
        .hospital-card:nth-child(3) { animation-delay: 0.3s; }
        .hospital-card:nth-child(4) { animation-delay: 0.4s; }
        .hospital-card:nth-child(5) { animation-delay: 0.5s; }
        .hospital-card:nth-child(6) { animation-delay: 0.6s; }
        .hospital-card:nth-child(7) { animation-delay: 0.7s; }
        .hospital-card:nth-child(8) { animation-delay: 0.8s; }

        /* No Results Animation */
        .no-results {
          animation: fadeIn 0.8s ease-out;
        }

        /* Floating Animation for Background */
        .floating-bg {
          animation: float 6s ease-in-out infinite;
        }

        /* Hover Effect for Hospital Name */
        .hospital-name {
          transition: all 0.3s ease;
          position: relative;
        }

        .hospital-name::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 50%;
          background-color: #dc2626;
          transition: all 0.3s ease;
        }

        .hospital-card:hover .hospital-name::after {
          width: 100%;
          left: 0;
        }

        /* District Text Animation */
        .district-text {
          transition: all 0.3s ease;
        }

        .hospital-card:hover .district-text {
          transform: translateY(-2px);
          color: #dc2626;
        }
      `}</style>

      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-red-50 to-white">
        <Navbar />

        {/* Added pt-20 or pt-24 to account for navbar height */}
        <main className="flex-grow py-14 px-6 pt-20">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="page-title text-4xl sm:text-5xl font-extrabold text-red-700 mb-3">
              🏥 Find Blood Availability
            </h1>
            <p className="page-subtitle text-gray-500 text-lg">
              Search by <span className="text-red-600 font-medium">Blood Type</span> and <span className="text-red-600 font-medium">District</span>
            </p>
          </div>

          {/* Filters */}
          <div className="filter-container max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-lg p-6 border border-red-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <select
                className="animated-select px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
              >
                <option value="">Select Blood Type</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                className="animated-select px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(selectedBloodType || selectedDistrict) && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setSelectedBloodType("");
                    setSelectedDistrict("");
                  }}
                  className="clear-button px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          {(selectedBloodType || selectedDistrict) && (
            <div className="results-summary max-w-4xl mx-auto mb-6 text-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredHospitals.length}</span> of{" "}
                <span className="font-semibold">{allHospitals.length}</span> hospitals
                {selectedBloodType && ` with ${selectedBloodType}`}
                {selectedDistrict && ` in ${selectedDistrict}`}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-5 loading-shimmer"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 loading-shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 loading-shimmer"></div>
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    <div className="h-8 bg-gray-200 rounded-full w-20 loading-shimmer"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-24 loading-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hospital Cards */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredHospitals.length === 0 ? (
                <div className="no-results col-span-full text-center py-12 bg-white rounded-xl shadow-md border border-red-100">
                  <p className="text-gray-500 text-lg mb-2">
                    No matching hospitals found.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your search criteria.
                  </p>
                </div>
              ) : (
                filteredHospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="hospital-card bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-red-100 p-6 flex flex-col items-center group"
                  >
                    <div className="blood-icon w-16 h-16 bg-gradient-to-br from-red-200 to-red-100 rounded-full flex items-center justify-center mb-5 text-red-600 text-3xl shadow-inner">
                      🩸
                    </div>

                    <h2 className="hospital-name text-xl font-semibold text-center text-gray-800 mb-1 group-hover:text-red-600">
                      {hospital.hospitalName}
                    </h2>
                    <p className="district-text text-sm text-gray-500 text-center mb-3">
                      {hospital.district}
                    </p>

                    <div className="w-full flex flex-wrap justify-center gap-2 mt-2">
                      {hospital.bloodData.map((blood, i) => (
                        <div
                          key={i}
                          className="blood-badge bg-red-50 text-red-700 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 shadow-sm group-hover:bg-red-100"
                        >
                          {blood.bloodType}: {blood.totalUnits} units
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}