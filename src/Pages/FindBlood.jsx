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

  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/bloodroutes/all-hospitals");
        console.log("🔍 Debug - All hospitals data:", res.data);
        setAllHospitals(res.data);
        setFilteredHospitals(res.data);
      } catch (err) {
        console.error("❌ Error fetching hospital data:", err);
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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gradient-to-br from-red-50 to-white py-14 px-6">
        <h1 className="text-4xl font-extrabold text-center text-red-700 mb-10">
          🏥 Search Blood Availability
        </h1>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
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
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
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
                className="px-6 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {(selectedBloodType || selectedDistrict) && (
          <div className="max-w-4xl mx-auto mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredHospitals.length} of {allHospitals.length} hospitals
              {selectedBloodType && ` with ${selectedBloodType}`}
              {selectedDistrict && ` in ${selectedDistrict}`}
            </p>
          </div>
        )}

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-full text-center py-12">
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
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-red-100 p-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5 text-red-600 text-3xl shadow-inner">
                  🩸
                </div>

                <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
                  {hospital.hospitalName}
                </h2>
                <p className="text-sm text-gray-500 text-center mb-3">
                  {hospital.district}
                </p>

                <div className="w-full flex flex-wrap justify-center gap-2 mt-2">
                  {hospital.bloodData.map((blood, i) => (
                    <div
                      key={i}
                      className="bg-red-50 text-red-700 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 shadow-sm"
                    >
                      {blood.bloodType}: {blood.totalUnits} units
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}