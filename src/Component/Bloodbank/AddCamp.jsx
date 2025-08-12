import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Building2, FileText, Phone, Heart, Upload, Plus } from "lucide-react";
import axiosInstance from "../../axiosInstance";
import CampHistory from "./CampHistory";

export default function AddCamp() {
  const [formData, setFormData] = useState({
    title: "",
    hospital: "",
    date: "",
    time: "",
    location: "",
    description: "",
    contact: "",
    document: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({
        ...prev,
        document: e.dataTransfer.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("🔍 Debug - Form data to submit:", formData);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('hospital', formData.hospital);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('contact', formData.contact);
      
      if (formData.document) {
        formDataToSend.append('document', formData.document);
        console.log("🔍 Debug - Document attached:", formData.document.name);
      }

      console.log("🔍 Debug - Making API call to /camp/add");
      
      // Make API call to save camp
      const response = await axiosInstance.post('/camp/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("🔍 Debug - API response:", response.data);
      
      // Show success message
      const successMessage = `✅ Campaign "${formData.title}" created successfully! It will appear in your campaign history below.`;
      alert(successMessage);
      
      // Reset form
      setFormData({
        title: "",
        hospital: "",
        date: "",
        time: "",
        location: "",
        description: "",
        contact: "",
        document: null,
      });
      
      // Trigger refresh of camp history
      setRefreshHistory(prev => prev + 1);
    } catch (err) {
      console.error("❌ Error creating campaign:", err);
      console.error("❌ Error response:", err.response?.data);
      alert(err.response?.data?.error || "Error creating campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "title", type: "text", placeholder: "Enter campaign title", icon: Heart, required: true },
    { name: "hospital", type: "text", placeholder: "Enter organizing hospital", icon: Building2, required: true },
    { name: "date", type: "date", placeholder: "", icon: Calendar, required: true },
    { name: "time", type: "time", placeholder: "", icon: Clock, required: true },
    { name: "location", type: "text", placeholder: "Enter venue location", icon: MapPin, required: true },
    { name: "contact", type: "text", placeholder: "Contact person name and phone", icon: Phone, required: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-red-50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {/* Your Logo */}
            <div className="relative">
              <img 
                src="/src/assets/logo2.png" 
                alt="Organization Logo" 
                className="w-20 h-20 object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            Save Lives Together
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create a blood donation campaign and make a difference in your community
          </p>
        </div>

        {/* Add Campaign Form */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-red-100 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg">
              <Plus className="w-6 h-6" />
              <h2 className="text-xl font-bold">Add Blood Donation Campaign</h2>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name} className="group">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-700 transition-colors duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-red-600"
                        onChange={handleChange}
                        value={formData[field.name]}
                        required={field.required}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Description Field */}
            <div className="group">
              <div className="relative">
                <div className="absolute left-4 top-4 text-red-600 group-focus-within:text-red-700 transition-colors duration-200">
                  <FileText className="w-5 h-5" />
                </div>
                <textarea
                  name="description"
                  placeholder="Enter campaign description and details..."
                  rows="4"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:ring-4 focus:ring-red-100 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm group-hover:border-red-600"
                  onChange={handleChange}
                  value={formData.description}
                  required
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="group">
              <label className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <Upload className="w-5 h-5 text-red-600" />
                Valid Documents*
              </label>
              <div
                className={`relative border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 bg-white/30 backdrop-blur-sm ${
                  dragActive 
                    ? "border-red-600 bg-red-50" 
                    : "border-gray-300 hover:border-red-600 hover:bg-red-50/30"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  name="document"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleChange}
                  required
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      {formData.document ? formData.document.name : "Drop your document here"}
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse files
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`group relative px-12 py-4 bg-red-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isSubmitting 
                    ? "opacity-75 cursor-not-allowed" 
                    : "hover:bg-red-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Campaign...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 group-hover:animate-pulse" />
                    Create Campaign
                  </div>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Campaign History */}
        <CampHistory key={refreshHistory} />
      </div>
    </div>
  );
}