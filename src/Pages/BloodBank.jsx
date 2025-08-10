import React, { useEffect, useState } from "react";
import AddBlood from "../Component/Bloodbank/AddBlood";
import BloodHistory from "../Component/Bloodbank/BloodHistory";
import AddCamp from "../Component/Bloodbank/AddCamp";
import BloodSummary from "../Component/Bloodbank/BloodSummary";
import DonorRequests from "../Component/Bloodbank/DonorRequests";
import axiosInstance from "../axiosInstance"; // centralized axios instance

export default function BloodBank() {
  console.log("🔍 Debug - BloodBank component loaded");
  
  const [activeTab, setActiveTab] = useState("blood");
  const [bloodHistory, setBloodHistory] = useState([]);
  const [bloodSummary, setBloodSummary] = useState({});
  const [myBloodData, setMyBloodData] = useState({
    aggregated: [],
    history: [],
  });
  const [hospitalName, setHospitalName] = useState("");

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("hospital");
    localStorage.removeItem("userType");

    // Redirect to login page
    window.location.href = "/Login";
  };

  const fetchBloodData = async () => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    console.log("🔍 Debug - BloodBank: Token exists:", !!token);
    console.log("🔍 Debug - BloodBank: User type:", userType);
    
    if (!token) {
      console.log("🔍 Debug - No token found, redirecting to login");
      window.location.href = "/Login";
      return;
    }

    // Only fetch data if user is a hospital
    if (userType !== "hospital") {
      console.log("🔍 Debug - User is not a hospital, redirecting");
      window.location.href = "/Login";
      return;
    }

    // Test if server is running
    try {
      const serverTest = await fetch("http://localhost:5000/");
      if (!serverTest.ok) {
        console.error("❌ Backend server is not running!");
        alert("❌ Backend server is not running. Please start the server first.");
        return;
      }
      console.log("✅ Backend server is running");
    } catch (serverErr) {
      console.error("❌ Cannot connect to backend server:", serverErr);
      alert("❌ Cannot connect to backend server. Please start the server first.");
      return;
    }

    try {
      console.log("🔍 Debug - Fetching blood data with token");

      // Try to fetch hospital profile (optional)
      try {
        const hospitalProfileRes = await axiosInstance.get("/routeshospital/profile");
        setHospitalName(hospitalProfileRes.data.hospitalName);
        console.log("🔍 Debug - Hospital profile fetched:", hospitalProfileRes.data);
      } catch (profileErr) {
        console.log("🔍 Debug - Could not fetch hospital profile, trying to get from localStorage");
        // Try to get hospital name from localStorage (from login)
        const hospitalData = localStorage.getItem("hospital");
        if (hospitalData) {
          try {
            const hospital = JSON.parse(hospitalData);
            setHospitalName(hospital.hospitalName || "Hospital");
            console.log("🔍 Debug - Hospital name from localStorage:", hospital.hospitalName);
          } catch (parseErr) {
            console.log("🔍 Debug - Could not parse hospital data from localStorage");
            setHospitalName("Hospital");
          }
        } else {
          setHospitalName("Hospital");
        }
      }

      const [historyRes, myBloodRes] = await Promise.all([
        axiosInstance.get("/bloodroutes/history"),
        axiosInstance.get("/bloodroutes/my-blood"),
      ]);

      console.log("🔍 Debug - History response:", historyRes.data);
      console.log("🔍 Debug - My blood response:", myBloodRes.data);

      setBloodHistory(historyRes.data || []);
      setMyBloodData(myBloodRes.data || { aggregated: [], history: [] });
      console.log("🔍 Debug - Blood data fetched successfully");
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      console.error("❌ Error response:", err.response?.data);
      
      if (err.response?.status === 401) {
        console.log("🔍 Debug - 401 error, clearing token and redirecting");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("hospital");
        localStorage.removeItem("userType");
        window.location.href = "/Login";
      }
    }
  };

  useEffect(() => {
    // Add a small delay to ensure token is properly stored
    const timer = setTimeout(() => {
      fetchBloodData();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 ">
      {/* Header */}
      <header className="bg-red-600 text-white text-center py-10 px-4 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md"
        >
           Logout
        </button>

        {/* <h1 className="text-4xl font-bold">Give Blood. Save Lives.</h1> */}
        <h1 className="text-4xl font-bold">
          {hospitalName ? ` ${hospitalName}` : "Give Blood. Save Lives."}
        </h1>
        <p className="mt-2 text-sm">Add available blood and Blood Campaign</p>
        <div className="mt-6 flex justify-center flex-wrap gap-4">
          <button
            onClick={() => setActiveTab("blood")}
            className={`px-5 py-2 rounded font-semibold shadow ${
              activeTab === "blood"
                ? "bg-white text-red-600"
                : "bg-red-700 text-white"
            }`}
          >
            Add Blood
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`px-5 py-2 rounded font-semibold shadow ${
              activeTab === "requests"
                ? "bg-white text-red-600"
                : "bg-red-700 text-white"
            }`}
          >
            Donor Requests
          </button>

          <button
            onClick={() => setActiveTab("camp")}
            className={`px-5 py-2 rounded font-semibold shadow ${
              activeTab === "camp"
                ? "bg-white text-red-600"
                : "bg-red-700 text-white"
            }`}
          >
            Add Blood Campaign
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === "blood" && (
          <>
            


            {/* Optionally show the hospital’s own blood data here */}
            <div className="bg-white rounded-lg p-6 shadow-md col-span-1 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-center  text-red-600">
                 Blood Unit Summary
              </h2>



              {myBloodData.aggregated && myBloodData.aggregated.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
                  {myBloodData.aggregated.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-red-50 border border-red-200 rounded-2xl p-3 text-center hover:bg-red-400 hover:text-white transition duration-300 shadow-md hover:scale-105 transform cursor-pointer"
                    >
                      <div className="text-sm font-bold text-red-700 hover:text-white transition-colors duration-300">
                        {item._id}
                      </div>
                      <div className="text-lg font-bold text-red-600 hover:text-white transition-colors duration-300">
                        {item.totalUnits}
                      </div>
                      <div className="text-xs text-gray-600 hover:text-gray-200 transition-colors duration-300">Units</div>
                      <div className="text-xs text-gray-500 hover:text-gray-200 transition-colors duration-300">
                        {item.entryCount} entries
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">
                  No blood data submitted yet.
                </p>
              )}


            </div>

            <AddBlood onBloodAdded={fetchBloodData} />
            

            
            {/* Hospital's own blood history */}
            <div className="bg-white rounded-lg p-6 shadow-md col-span-1 lg:col-span-1 lg:col-start-2">
              <h2 className="text-xl font-bold mb-4 text-center text-red-600"> Blood Unit History</h2>
              {myBloodData.history && myBloodData.history.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {myBloodData.history.map((entry, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-red-100">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-red-700 mr-3">{entry.bloodType}</span>
                          <span className="text-xl font-bold text-red-600">{entry.units} units</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()} at {new Date(entry.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        Entry ID: {entry._id}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">No blood unit history available.</p>
                  <p className="text-gray-400 text-sm mt-2">Start by adding blood units above.</p>
                </div>
              )}
            </div>
          </>
        )}
        {activeTab === "requests" && (
          <div className="lg:col-span-2">
            <DonorRequests />
          </div>
        )}
        {activeTab === "camp" && (
          <div className="lg:col-span-2">
            <AddCamp />
          </div>
        )}
      </main>
    </div>
  );
}
