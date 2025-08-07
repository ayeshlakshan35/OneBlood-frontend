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

// Simple blood type styling
const getBloodTypeStyle = (bloodType) => {
  return "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100";
};

// Get availability status
const getAvailabilityStatus = (units) => {
  if (units >= 20) return { status: 'Available', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' };
  if (units >= 10) return { status: 'Limited', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' };
  if (units > 0) return { status: 'Low Stock', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' };
  return { status: 'Unavailable', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
};

export default function FindBlood() {
  const [allHospitals, setAllHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/bloodroutes/all-hospitals");
        console.log("🔍 Debug - All hospitals data:", response.data);
        setAllHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (error) {
        console.error("❌ Error fetching hospital data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("❌ Failed to load background image: /child.png");
      setImageLoaded(false);
    };
    img.src = "/child.png";
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-24 relative z-0">
        {/* Hero Section - With Background Image and Red Overlay */}
        <div className="relative bg-white border-b border-gray-200 -mt-24 pt-24 overflow-hidden min-h-[500px]">
          {/* Background Image - with fallback */}
          {imageLoaded ? (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
              style={{
                backgroundImage: `linear-gradient(rgba(156, 69, 69, 0.85), rgba(132, 46, 46, 0.9)), url('/child.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'  
              }}
            ></div>
          ) : (
            // Fallback gradient background if image doesn't load
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-red-50 to-pink-100"></div>
          )}
          
          {/* Red Overlay - adjusted opacity based on whether image loaded */}
          <div className={`absolute inset-0 ${imageLoaded ? 'bg-red-600 bg-opacity-50' : 'bg-red-600 bg-opacity-80'}`}></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Find Blood Donors
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto mb-8 drop-shadow-md">
                Connect with hospitals and blood banks across Sri Lanka to find the blood type you need.
              </p>
              
              {/* Simple Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-black mb-2 drop-shadow-sm">500+</div>
                  <div className="text-red-500 drop-shadow-sm">Hospitals Connected</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-black mb-2 drop-shadow-sm">24/7</div>
                  <div className="text-red-500 drop-shadow-sm">Emergency Support</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-black mb-2 drop-shadow-sm">10,000+</div>
                  <div className="text-red-500 drop-shadow-sm">Lives Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Search Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedBloodType("");
                    setSelectedDistrict("");
                  }}
                  className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          {(selectedBloodType || selectedDistrict) && (
            <div className="mb-6 text-center">
              <div className="inline-block bg-white rounded-lg border border-gray-200 px-4 py-2">
                <p className="text-gray-700">
                  Showing <span className="font-semibold text-red-600">{filteredHospitals.length}</span> of {allHospitals.length} hospitals
                  {selectedBloodType && <span className="text-gray-900"> with {selectedBloodType}</span>}
                  {selectedDistrict && <span className="text-gray-900"> in {selectedDistrict}</span>}
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading hospitals...</p>
              </div>
            </div>
          )}

          {/* Hospital Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white rounded-lg border border-gray-200 p-12 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hospitals Found</h3>
                    <p className="text-gray-600 mb-4">
                      No hospitals match your search criteria. Try adjusting your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedBloodType("");
                        setSelectedDistrict("");
                      }}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Show All Hospitals
                    </button>
                  </div>
                </div>
              ) : (
                filteredHospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Hospital Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {hospital.hospitalName}
                          </h3>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{hospital.district}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Available Types</div>
                          <div className="text-xl font-semibold text-red-600">{hospital.bloodData?.length || 0}</div>
                        </div>
                      </div>
                    </div>

                    {/* Blood Types Section */}
                    <div className="p-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Blood Availability</h4>
                      
                      <div className="space-y-3">
                        {hospital.bloodData?.map((blood, i) => {
                          const availability = getAvailabilityStatus(blood.totalUnits);
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                                  <span className="font-bold text-red-600 text-sm">{blood.bloodType}</span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{blood.totalUnits} units</div>
                                </div>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${availability.bg} ${availability.color} ${availability.border} border`}>
                                {availability.status}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Contact Button */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
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