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

// Blood type color mapping
const getBloodTypeColor = (bloodType) => {
  const colorMap = {
    'A+': 'bg-blue-50 text-blue-700 border-blue-200',
    'A-': 'bg-blue-100 text-blue-800 border-blue-300',
    'B+': 'bg-green-50 text-green-700 border-green-200',
    'B-': 'bg-green-100 text-green-800 border-green-300',
    'AB+': 'bg-purple-50 text-purple-700 border-purple-200',
    'AB-': 'bg-purple-100 text-purple-800 border-purple-300',
    'O+': 'bg-red-50 text-red-700 border-red-200',
    'O-': 'bg-red-100 text-red-800 border-red-300',
  };
  return colorMap[bloodType] || 'bg-gray-50 text-gray-700 border-gray-200';
};

// Get availability status
const getAvailabilityStatus = (units) => {
  if (units >= 20) return { status: 'High', color: 'text-green-600', bg: 'bg-green-100' };
  if (units >= 10) return { status: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  if (units > 0) return { status: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
  return { status: 'Out', color: 'text-gray-500', bg: 'bg-gray-100' };
};

export default function FindBlood() {
  const [allHospitals, setAllHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/bloodroutes/all-hospitals");
        console.log("🔍 Debug - All hospitals data:", res.data);
        setAllHospitals(res.data);
        setFilteredHospitals(res.data);
      } catch (err) {
        console.error("❌ Error fetching hospital data:", err);
      } finally {
        setLoading(false);
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <Navbar />

      <main className="flex-grow pt-24 relative z-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-pink-600 text-white overflow-hidden -mt-24 pt-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="medical-cross" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="8" y="0" width="4" height="20" fill="currentColor"/>
                  <rect x="0" y="8" width="20" height="4" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#medical-cross)"/>
            </svg>
          </div>
          
          {/* Floating Medical Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-white opacity-20 text-4xl animate-pulse">🩸</div>
            <div className="absolute top-32 right-20 text-white opacity-15 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🏥</div>
            <div className="absolute bottom-32 left-20 text-white opacity-20 text-3xl animate-pulse" style={{animationDelay: '2s'}}>❤️</div>
            <div className="absolute bottom-20 right-32 text-white opacity-15 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🩺</div>
            <div className="absolute top-1/2 left-1/4 text-white opacity-10 text-5xl animate-pulse" style={{animationDelay: '1.5s'}}>+</div>
            <div className="absolute top-1/3 right-1/4 text-white opacity-10 text-5xl animate-pulse" style={{animationDelay: '3s'}}>+</div>
          </div>
          
          <div className="relative z-10 px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Header */}
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                  Find Blood
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
                    Save Lives
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed">
                  Connect with hospitals and blood banks across Sri Lanka. Every search brings hope to someone in need.
                </p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="text-3xl font-bold text-red-900 mb-2">500+</div>
                  <div className="text-red-400 font-medium">Hospitals Connected</div>
                </div>
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="text-3xl font-bold text-red-900 mb-2">24/7</div>
                  <div className="text-red-400 font-medium">Emergency Support</div>
                </div>
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="text-3xl font-bold text-red-900 mb-2">10K+</div>
                  <div className="text-red-400 font-medium">Lives Saved</div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🔍 Start Searching
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105">
                  📞 Emergency Contact
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-red-50"></path>
            </svg>
          </div>
        </div>
        
        {/* Content Section with proper spacing */}
        <div className="px-6 py-16 -mt-1">

          {/* Search Filters */}
          <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Blood Type</label>
                <select
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                >
                  <option value="">All Blood Types</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">District</label>
                <select
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">All Districts</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedBloodType || selectedDistrict) && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setSelectedBloodType("");
                    setSelectedDistrict("");
                  }}
                  className="px-8 py-3 text-red-600 border-2 border-red-200 rounded-full hover:bg-red-50 hover:border-red-300 transition-all duration-300 font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

          {/* Results Summary */}
          {(selectedBloodType || selectedDistrict) && (
            <div className="max-w-5xl mx-auto mb-8 text-center">
              <div className="bg-white rounded-2xl p-4 shadow-md inline-block">
                <p className="text-gray-700 font-medium">
                  Found <span className="text-red-600 font-bold">{filteredHospitals.length}</span> of {allHospitals.length} hospitals
                  {selectedBloodType && <span className="text-blue-600"> with {selectedBloodType}</span>}
                  {selectedDistrict && <span className="text-green-600"> in {selectedDistrict}</span>}
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                <p className="text-gray-600 font-medium">Loading hospitals...</p>
              </div>
            </div>
          )}

          {/* Hospital Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredHospitals.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="bg-white rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      🏥
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">No Hospitals Found</h3>
                    <p className="text-gray-500 mb-6">
                      No hospitals match your search criteria. Try adjusting your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedBloodType("");
                        setSelectedDistrict("");
                      }}
                      className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-semibold"
                    >
                      Show All Hospitals
                    </button>
                  </div>
                </div>
              ) : (
                filteredHospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Hospital Header */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                          🏥
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-90">Available Now</div>
                          <div className="text-lg font-bold">{hospital.bloodData.length} Types</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h2 className="text-xl font-bold mb-1 group-hover:text-yellow-200 transition-colors">
                          {hospital.hospitalName}
                        </h2>
                        <div className="flex items-center text-red-100">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{hospital.district}</span>
                        </div>
                      </div>
                    </div>

                    {/* Blood Types Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        Blood Availability
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {hospital.bloodData.map((blood, i) => {
                          const availability = getAvailabilityStatus(blood.totalUnits);
                          return (
                            <div
                              key={i}
                              className={`${getBloodTypeColor(blood.bloodType)} p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-md`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="font-bold text-lg">{blood.bloodType}</div>
                                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${availability.bg} ${availability.color}`}>
                                  {availability.status}
                                </div>
                              </div>
                              <div className="mt-2 text-sm opacity-80">
                                {blood.totalUnits} units
                              </div>
                              <div className="mt-2 bg-white bg-opacity-50 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-current opacity-60 transition-all duration-500"
                                  style={{ width: `${Math.min((blood.totalUnits / 50) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Contact Section */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                          Contact Hospital
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}