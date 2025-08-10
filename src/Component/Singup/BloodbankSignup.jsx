import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

// Creative Toast Notification Component
const SuccessToast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 transform transition-all duration-500 ease-out animate-slideIn">
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl shadow-2xl border border-green-300 max-w-sm">
        <div className="flex items-center space-x-3">
          {/* Success Icon with animation */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          {/* Message */}
          <div className="flex-1">
            <p className="font-semibold text-sm">Hospital Registered!</p>
            <p className="text-xs text-green-100">{message}</p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white hover:text-green-200 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-white bg-opacity-20 rounded-full h-1">
          <div className="bg-white h-1 rounded-full animate-shrink"></div>
        </div>
      </div>
    </div>
  );
};

export default function BloodbankSignup({ gotoBloodBank, goto }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    district: "",
    validDocuments: null,
    phoneNumber: "", 
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (
      !formData.hospitalName ||
      !formData.address ||
      !formData.district ||
      !formData.validDocuments ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("hospitalName", formData.hospitalName);
      data.append("address", formData.address);
      data.append("district", formData.district);
      data.append("validDocuments", formData.validDocuments);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("email", formData.email);
      data.append("password", formData.password);

      const res = await axiosInstance.post(
        "/routeshospital/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Show success toast
      showSuccessToast(res.data.message || "Hospital registration successful!");
      
      setError("");
      setTimeout(() => {
        goto();
      }, 2500); // Slightly longer delay to see the toast
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <SuccessToast 
        show={showToast} 
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-shrink {
          animation: shrink 3s linear;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form header with tab selection */}
          <div className="flex border-b">
            <button 
              onClick={gotoBloodBank}
              className={`flex-1 py-4 px-6 text-center font-semibold text-lg ${false ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-500'}`}
            >
              User Registration
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-semibold text-lg ${true ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-500'}`}
            >
              Hospital Registration
            </button>
          </div>

          {/* Form content */}
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              Hospital Registration
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Hospital Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter hospital name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />
              </div>

              {/* Address & District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter hospital address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value="">Select district</option>
                    <optgroup label="Western Province">
                      <option value="COLOMBO">COLOMBO</option>
                      <option value="GAMPAHA">GAMPAHA</option>
                      <option value="KALUTARA">KALUTARA</option>
                    </optgroup>
                    <optgroup label="Central Province">
                      <option value="KANDY">KANDY</option>
                      <option value="MATALE">MATALE</option>
                      <option value="NUWARA ELIYA">NUWARA ELIYA</option>
                    </optgroup>
                    <optgroup label="Southern Province">
                      <option value="GALLE">GALLE</option>
                      <option value="MATARA">MATARA</option>
                      <option value="HAMBANTOTA">HAMBANTOTA</option>
                    </optgroup>
                    <optgroup label="Northern Province">
                      <option value="JAFFNA">JAFFNA</option>
                      <option value="KILINOCHCHI">KILINOCHCHI</option>
                      <option value="MANNAR">MANNAR</option>
                      <option value="VAVUNIYA">VAVUNIYA</option>
                      <option value="MULLAITIVU">MULLAITIVU</option>
                    </optgroup>
                    <optgroup label="Eastern Province">
                      <option value="TRINCOMALEE">TRINCOMALEE</option>
                      <option value="BATTICALOA">BATTICALOA</option>
                      <option value="AMPARA">AMPARA</option>
                    </optgroup>
                    <optgroup label="North Western Province">
                      <option value="KURUNEGALA">KURUNEGALA</option>
                      <option value="PUTTALAM">PUTTALAM</option>
                    </optgroup>
                    <optgroup label="North Central Province">
                      <option value="ANURADHAPURA">ANURADHAPURA</option>
                      <option value="POLONNARUWA">POLONNARUWA</option>
                    </optgroup>
                    <optgroup label="Uva Province">
                      <option value="BADULLA">BADULLA</option>
                      <option value="MONARAGALA">MONARAGALA</option>
                    </optgroup>
                    <optgroup label="Sabaragamuwa Province">
                      <option value="RATNAPURA">RATNAPURA</option>
                      <option value="KEGALLE">KEGALLE</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Documents and Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Documents <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    name="validDocuments"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
                  isSubmitting
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'Registering...' : 'Register Hospital'}
              </button>

              {/* Navigation to Sign In */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={goto}
                  className="text-red-600 hover:text-red-800 font-medium hover:underline focus:outline-none"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}