import React, { useEffect, useState } from "react";
import AddBlood from "../Component/Bloodbank/AddBlood";
import BloodHistory from "../Component/Bloodbank/BloodHistory";
import AddCamp from "../Component/Bloodbank/AddCamp";
import BloodSummary from "../Component/Bloodbank/BloodSummary";
import DonorRequests from "../Component/Bloodbank/DonorRequests";
import axiosInstance, { getSessionData, clearSessionData } from "../axiosInstance"; // centralized axios instance
import { useToast } from "../Component/Toast/ToastContext";
import { 
  Droplets, 
  Activity, 
  Users, 
  Calendar, 
  TrendingUp, 
  Shield,
  LogOut,
  Plus,
  FileText,
  Target,
  History,
  Menu,
  X
} from "lucide-react";

export default function BloodBank() {
  console.log("🔍 Debug - BloodBank component loaded");
  
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  const [activeTab, setActiveTab] = useState("blood");
  const [bloodHistory, setBloodHistory] = useState([]);
  const [bloodSummary, setBloodSummary] = useState({});
  const [myBloodData, setMyBloodData] = useState({
    aggregated: [],
    history: [],
  });
  const [hospitalName, setHospitalName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear all stored data for this session
    clearSessionData();

    // Redirect to login page
    window.location.href = "/Login";
  };

  const fetchBloodData = async () => {
    // Check if user is authenticated
    const token = getSessionData("token");
    const userType = getSessionData("userType");
    
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
        showError("Backend server is not running. Please start the server first.");
        return;
      }
      console.log("✅ Backend server is running");
    } catch (serverErr) {
      console.error("❌ Cannot connect to backend server:", serverErr);
      showError("Cannot connect to backend server. Please start the server first.");
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
        console.log("🔍 Debug - Could not fetch hospital profile, trying to get from sessionStorage");
        // Try to get hospital name from sessionStorage (from login)
        const hospitalData = getSessionData("hospital");
        if (hospitalData) {
          try {
            setHospitalName(hospitalData.hospitalName || "Hospital");
            console.log("🔍 Debug - Hospital name from sessionStorage:", hospitalData.hospitalName);
          } catch (parseErr) {
            console.log("🔍 Debug - Could not parse hospital data from sessionStorage");
            setHospitalName("Hospital");
          }
        } else {
          setHospitalName("Hospital");
        }
      }

      // Fetch blood data, campaigns, and requests
      const [historyRes, myBloodRes, campaignsRes, requestsRes] = await Promise.all([
        axiosInstance.get("/bloodroutes/history"),
        axiosInstance.get("/bloodroutes/my-blood"),
        axiosInstance.get("/camp/user-camps").catch(() => ({ data: { camps: [] } })),
        axiosInstance.get("/donors/hospital-requests").catch(() => ({ data: [] }))
      ]);

      console.log("🔍 Debug - History response:", historyRes.data);
      console.log("🔍 Debug - My blood response:", myBloodRes.data);
      console.log("🔍 Debug - Campaigns response:", campaignsRes.data);
      console.log("🔍 Debug - Requests response:", requestsRes.data);

      setBloodHistory(historyRes.data || []);
      setMyBloodData(myBloodRes.data || { aggregated: [], history: [] });
      setCampaignsCount(Array.isArray(campaignsRes.data.camps) ? campaignsRes.data.camps.length : 0);
      
      // Handle requests count with better logic
      const requestsData = requestsRes.data || [];
      console.log("🔍 Debug - Initial requests data:", requestsData);
      
      let initialRequestsCount = 0;
      if (Array.isArray(requestsData) && requestsData.length > 0) {
        console.log("🔍 Debug - First request item structure:", requestsData[0]);
        if (requestsData[0].hasOwnProperty('status')) {
          initialRequestsCount = requestsData.filter(req => 
            req.status && req.status.toLowerCase() === 'pending'
          ).length;
          console.log("🔍 Debug - Found status field, initial pending count:", initialRequestsCount);
        } else {
          initialRequestsCount = requestsData.length;
          console.log("🔍 Debug - No status field, using total count:", initialRequestsCount);
        }
      }
      
      setRequestsCount(initialRequestsCount);
      console.log("🔍 Debug - Initial requests count set to:", initialRequestsCount);
      console.log("🔍 Debug - All data fetched successfully");
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
    } finally {
      setIsLoading(false);
    }
  };

  // Add interval to refresh counts every 30 seconds
  useEffect(() => {
    // Initial data fetch
    const timer = setTimeout(() => {
      fetchBloodData();
    }, 100);

    // Set up interval to refresh counts every 30 seconds
    const interval = setInterval(() => {
      refreshRequestsCount();
      refreshCampaignsCount();
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Monitor counts changes for debugging
  useEffect(() => {
    console.log("🔍 Debug - Requests count changed to:", requestsCount);
  }, [requestsCount]);

  useEffect(() => {
    console.log("🔍 Debug - Campaigns count changed to:", campaignsCount);
  }, [campaignsCount]);

  // Calculate total blood units
  const totalBloodUnits = myBloodData.aggregated?.reduce((total, item) => total + item.totalUnits, 0) || 0;
  const totalEntries = myBloodData.aggregated?.reduce((total, item) => total + item.entryCount, 0) || 0;

  // Filter and sort blood history
  const filteredAndSortedHistory = React.useMemo(() => {
    if (!myBloodData.history) return [];
    
    let filtered = myBloodData.history.filter(entry => {
      const matchesSearch = entry.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodType = !selectedBloodType || entry.bloodType === selectedBloodType;
      return matchesSearch && matchesBloodType;
    });

    // Sort the filtered results
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "bloodType":
        filtered.sort((a, b) => a.bloodType.localeCompare(b.bloodType));
        break;
      case "units":
        filtered.sort((a, b) => b.units - a.units);
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [myBloodData.history, searchTerm, selectedBloodType, sortBy]);

  // Function to refresh just the requests count
  const refreshRequestsCount = async () => {
    try {
      console.log("🔍 Debug - Refreshing requests count...");
      
      // Try the correct endpoint first
      const requestsRes = await axiosInstance.get("/donors/hospital-requests");
      console.log("🔍 Debug - Raw requests response:", requestsRes.data);
      
      const requestsData = requestsRes.data || [];
      console.log("🔍 Debug - Requests data:", requestsData);
      
      // Check if we have an array and log the first item structure
      if (Array.isArray(requestsData) && requestsData.length > 0) {
        console.log("🔍 Debug - First request item structure:", requestsData[0]);
        console.log("🔍 Debug - First request status:", requestsData[0].status);
      }
      
      // Count all requests for now (we can filter by status later)
      const totalRequestsCount = Array.isArray(requestsData) ? requestsData.length : 0;
      
      // Try to filter by pending status if the field exists
      let pendingRequestsCount = totalRequestsCount;
      if (Array.isArray(requestsData) && requestsData.length > 0 && requestsData[0].hasOwnProperty('status')) {
        pendingRequestsCount = requestsData.filter(req => 
          req.status && req.status.toLowerCase() === 'pending'
        ).length;
        console.log("🔍 Debug - Found status field, pending count:", pendingRequestsCount);
      } else {
        console.log("🔍 Debug - No status field found, using total count:", totalRequestsCount);
      }
      
      setRequestsCount(pendingRequestsCount);
      console.log("🔍 Debug - Final requests count set to:", pendingRequestsCount);
    } catch (error) {
      console.error("❌ Error refreshing requests count:", error);
      console.error("❌ Error response:", error.response?.data);
      
      // Try alternative endpoint if the first one fails
      try {
        console.log("🔍 Debug - Trying alternative endpoint...");
        const altRequestsRes = await axiosInstance.get("/donorroutes/hospital-requests");
        const altRequestsData = altRequestsRes.data || [];
        const altCount = Array.isArray(altRequestsData) ? altRequestsData.length : 0;
        setRequestsCount(altCount);
        console.log("🔍 Debug - Alternative endpoint successful, count:", altCount);
      } catch (altError) {
        console.error("❌ Alternative endpoint also failed:", altError);
        setRequestsCount(0);
      }
    }
  };

  // Function to refresh campaigns count
  const refreshCampaignsCount = async () => {
    try {
      const campaignsRes = await axiosInstance.get("/camp/user-camps");
      setCampaignsCount(Array.isArray(campaignsRes.data.camps) ? campaignsRes.data.camps.length : 0);
      console.log("🔍 Debug - Campaigns count refreshed:", campaignsRes.data.camps.length);
    } catch (error) {
      console.error("❌ Error refreshing campaigns count:", error);
    }
  };

  // Function to handle request status changes
  const handleRequestStatusChange = () => {
    // Refresh the count when a request is accepted/rejected
    refreshRequestsCount();
  };

  // Function to handle camp creation
  const handleCampCreated = () => {
    // Refresh the campaigns count when a new camp is created
    refreshCampaignsCount();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-400 via-red-600 to-red-800 text-white text-center py-6 sm:py-8 lg:py-12 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20 z-20"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        
        {/* Mobile Menu Indicator */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-4 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs border border-white/20 z-10">
            Menu Open
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/20 backdrop-blur-sm text-white px-3 py-2 lg:px-6 lg:py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 group text-sm lg:text-base"
          data-aos="fade-down-left"
          data-aos-delay="200"
        >
          <LogOut className="inline-block w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Logout</span>
        </button>

        {/* Main Title */}
        <div data-aos="fade-up" data-aos-delay="100" className="mt-12 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 lg:mb-4 drop-shadow-lg px-4">
            {hospitalName ? `${hospitalName}` : "Blood Bank Admin"}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-red-100 mb-4 lg:mb-8 max-w-2xl mx-auto px-4">
            Manage blood inventory, donor requests, and blood campaigns efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 lg:mb-8" data-aos="fade-up" data-aos-delay="300">
          
          <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-3 lg:gap-6 px-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20 hover:bg-white/30 transition-all duration-300 group w-full sm:w-auto">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="bg-white/20 p-2 lg:p-3 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                  <Droplets className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{totalBloodUnits}</div>
                  <div className="text-xs lg:text-sm text-red-100 font-medium">Total Units</div>
                  <div className="text-xs text-red-200 mt-1">Available Blood</div>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20 hover:bg-white/30 transition-all duration-300 group w-full sm:w-auto">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="bg-white/20 p-2 lg:p-3 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                  <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{campaignsCount}</div>
                  <div className="text-xs lg:text-sm text-red-100 font-medium">Campaigns</div>
                  <div className="text-xs text-red-200 mt-1">Active Campaigns</div>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20 hover:bg-white/30 transition-all duration-300 group w-full sm:w-auto relative">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="bg-white/20 p-2 lg:p-3 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                  <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{requestsCount}</div>
                  <div className="text-xs lg:text-sm text-red-100 font-medium">Requests</div>
                  <div className="text-xs text-red-200 mt-1">Pending Requests</div>
                </div>
              </div>
              {/* Pending indicator */}
              {requestsCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                  !
                </div>
              )}
            </div>
          </div>
        </div>

        <br />

        {/* Navigation Tabs */}
        <div className={`flex flex-col sm:flex-row justify-center flex-wrap gap-3 sm:gap-4 lg:gap-6 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 mt-0 lg:max-h-none lg:opacity-100 lg:mt-0'
        }`} data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={() => {
              setActiveTab("blood");
              setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
            }}
            className={`w-full sm:w-auto px-6 sm:px-4 lg:px-8 py-3 sm:py-2 lg:py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-base sm:text-sm lg:text-base ${
              activeTab === "blood"
                ? "bg-white text-red-600 shadow-xl scale-105"
                : "bg-white/20 text-white hover:bg-white/30 border border-white/20"
            }`}
          >
            <Plus className="inline-block w-5 h-5 lg:w-5 lg:h-5 mr-2" />
            Add Blood
          </button>

          <button
            onClick={() => {
              setActiveTab("requests");
              setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
            }}
            className={`w-full sm:w-auto px-6 sm:px-4 lg:px-8 py-3 sm:py-2 lg:py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 relative text-base sm:text-sm lg:text-base overflow-visible ${
              activeTab === "requests"
                ? "bg-white text-red-600 shadow-xl scale-105"
                : "bg-white/20 text-white hover:bg-white/30 border border-white/20"
            }`}
          >
            <FileText className="inline-block w-5 h-5 lg:w-5 lg:h-5 mr-2" />
            Donor Requests
            {/* Notification Badge */}
            {requestsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg border-2 border-white z-50">
                {requestsCount > 99 ? '99+' : requestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("camp");
              setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
            }}
            className={`w-full sm:w-auto px-6 sm:px-4 lg:px-8 py-3 sm:py-2 lg:py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-base sm:text-sm lg:text-base ${
              activeTab === "camp"
                ? "bg-white text-red-600 shadow-xl scale-105"
                : "bg-white/20 text-white hover:bg-white/30 border border-white/20"
            }`}
          >
            <Target className="inline-block w-5 h-5 lg:w-5 lg:h-5 mr-2" />
            Blood Campaign
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-20" data-aos="fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {activeTab === "blood" && (
              <>
                {/* Upper Section: Blood Inventory Dashboard */}
                <div className="admin-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 mb-6 lg:mb-8 hover-lift" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                      <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-red-600" />
                      Blood Inventory Dashboard
                    </h2>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Last updated: {new Date().toLocaleString()}
                    </div>
                  </div>

                  {myBloodData.aggregated && myBloodData.aggregated.length > 0 ? (
                    <div className="blood-grid grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4">
                      {myBloodData.aggregated.map((item, idx) => (
                        <div
                          key={idx}
                          className="blood-type-indicator group bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 text-center hover:from-red-100 hover:to-red-200 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 transform cursor-pointer border-l-4 border-l-red-500 hover-lift"
                          data-aos="zoom-in"
                          data-aos-delay={idx * 100}
                        >
                          <div className="text-xs sm:text-sm font-bold text-red-700 group-hover:text-red-800 transition-colors duration-300 mb-1 lg:mb-2">
                            {item._id}
                          </div>
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 group-hover:text-red-800 transition-colors duration-300 mb-1">
                            {item.totalUnits}
                          </div>
                          <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-1">Units</div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                            {item.entryCount} entries
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 lg:py-12 animate-fade-in-scale" data-aos="fade-in">
                      <Droplets className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-base lg:text-lg mb-2">No blood data available</p>
                      <p className="text-gray-400 text-sm lg:text-base">Start by adding blood units below</p>
                    </div>
                  )}
                </div>

                {/* Lower Section: Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
                  {/* Left Side: Update Blood Stock */}
                  <div className="admin-card rounded-2xl shadow-xl border border-gray-100 hover-lift" data-aos="fade-right" data-aos-delay="200">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                        <Plus className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-red-600" />
                        Update Blood Stock
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Add new blood units to your inventory</p>
                    </div>
                    <div className="p-4 sm:p-6">
                      <AddBlood onBloodAdded={fetchBloodData} />
                    </div>
                  </div>

                  {/* Right Side: Blood Unit History */}
                  <div className="admin-card rounded-2xl shadow-xl border border-gray-100 hover-lift" data-aos="fade-left" data-aos-delay="300">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                        <History className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-red-600" />
                        Blood Unit History
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">View and manage your blood unit entries</p>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      {myBloodData.history && myBloodData.history.length > 0 ? (
                        <>
                          {/* Search and Filter Bar */}
                          <div className="mb-4 lg:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex flex-col gap-3 lg:gap-4">
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    placeholder="Search by blood type..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full text-sm"
                                  />
                                  <Droplets className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                </div>
                                <select 
                                  value={selectedBloodType}
                                  onChange={(e) => setSelectedBloodType(e.target.value)}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                >
                                  <option value="">All Types</option>
                                  <option value="A+">A+</option>
                                  <option value="A-">A-</option>
                                  <option value="B+">B+</option>
                                  <option value="B-">B-</option>
                                  <option value="AB+">AB+</option>
                                  <option value="AB-">AB-</option>
                                  <option value="O+">O+</option>
                                  <option value="O-">O-</option>
                                </select>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs sm:text-sm text-gray-600">Sort:</span>
                                  <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-xs sm:text-sm"
                                  >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="bloodType">Type</option>
                                    <option value="units">Units</option>
                                  </select>
                                </div>
                                {(searchTerm || selectedBloodType) && (
                                  <button
                                    onClick={() => {
                                      setSearchTerm("");
                                      setSelectedBloodType("");
                                    }}
                                    className="px-3 py-2 text-xs sm:text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* History Entries */}
                          <div className="space-y-2 lg:space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-2">
                            {filteredAndSortedHistory.map((entry, idx) => (
                              <div 
                                key={entry._id} 
                                className="bg-gradient-to-r from-gray-50 to-gray-100 p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-md group"
                                data-aos="fade-left"
                                data-aos-delay={idx * 50}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="bg-red-100 p-1.5 sm:p-2 rounded-full group-hover:bg-red-200 transition-colors duration-300">
                                      <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                                    </div>
                                    <div>
                                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                        <span className="font-bold text-red-700 text-sm">{entry.bloodType}</span>
                                        <span className="font-bold text-red-600 text-sm">{entry.units} units</span>
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        ID: {entry._id.slice(-8)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right sm:text-left">
                                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {new Date(entry.createdAt).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Summary Footer */}
                          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 gap-2">
                              <span>Showing <strong>{filteredAndSortedHistory.length}</strong> of <strong>{myBloodData.history?.length || 0}</strong></span>
                              <span>Total: <strong>{filteredAndSortedHistory.reduce((sum, entry) => sum + entry.units, 0)}</strong> units</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 lg:py-12 animate-fade-in-scale">
                          <FileText className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm lg:text-sm mb-1">No blood unit history</p>
                          <p className="text-gray-400 text-xs">Add blood units to see history</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "requests" && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100" data-aos="fade-up">
                <DonorRequests onRequestStatusChange={handleRequestStatusChange} />
              </div>
            )}
            
            {activeTab === "camp" && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100" data-aos="fade-up">
                <AddCamp onCampCreated={handleCampCreated} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}


