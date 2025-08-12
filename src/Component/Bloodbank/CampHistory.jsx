import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Building2, FileText, Phone, Heart, Trash2, Edit } from "lucide-react";
import axiosInstance from "../../axiosInstance";

export default function CampHistory() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCamps();
  }, []); // This will re-run whenever the component is re-mounted (when key changes)

  const fetchCamps = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔍 Debug - Fetching camps from /camp/user-camps");
      const response = await axiosInstance.get('/camp/user-camps');
      console.log("🔍 Debug - Camps response:", response.data);
      setCamps(response.data.camps);
    } catch (err) {
      console.error("❌ Error fetching camps:", err);
      console.error("❌ Error response:", err.response?.data);
      setError("Failed to fetch campaign history");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCamp = async (campId) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/camp/${campId}`);
      alert("Campaign deleted successfully!");
      fetchCamps(); // Refresh the list
    } catch (err) {
      console.error("Error deleting camp:", err);
      alert(err.response?.data?.error || "Error deleting campaign");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Heart className="text-red-600" />
          Campaign History
        </h3>
        <div className="text-center text-gray-500 py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p>Loading campaign history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Heart className="text-red-600" />
          Campaign History
        </h3>
        <div className="text-center text-red-500 py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <p>{error}</p>
          <button 
            onClick={fetchCamps}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Heart className="text-red-600" />
        Campaign History
        {camps.length > 0 && (
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {camps.length} campaign{camps.length !== 1 ? 's' : ''}
          </span>
        )}
      </h3>
      
      {camps.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <p>No campaigns found. Create your first campaign to see it here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {camps.map((camp) => (
            <div key={camp._id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    {camp.title}
                  </h4>
                  <p className="text-gray-600 mb-3">{camp.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteCamp(camp._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{camp.hospital}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{formatDate(camp.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{camp.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{camp.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{camp.contact}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-4 h-4 text-red-600" />
                  <span className="text-sm">
                    {camp.documentPath ? "Document uploaded" : "No document"}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Created: {formatDate(camp.createdAt)}</span>
                  <span>Campaign ID: {camp._id.slice(-8)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}