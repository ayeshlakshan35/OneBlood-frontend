import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

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
            <p className="font-semibold text-sm">Success!</p>
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

// Enhanced Login Component
export default function Log({ goto }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "email" 
        ? e.target.value.toLowerCase().trim() 
        : e.target.value.trim(),
    });
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const loginUrl = userType === "hospital"
        ? "/routeshospital/login"
        : "/auth/login";

      const res = await axiosInstance.post(loginUrl, formData);

      // Show creative success toast
      showSuccessToast(`Welcome back! Redirecting to ${userType === "hospital" ? "hospital" : "donor"} dashboard...`);
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", userType);
        
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        if (res.data.hospital) {
          localStorage.setItem("hospital", JSON.stringify(res.data.hospital));
        }

        setTimeout(() => {
          navigate(userType === "hospital" ? "/BloodB" : "/home");
        }, 2000); // Slightly longer delay to see the toast
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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

      <div className="w-full">
        <p className="text-gray-500 text-center mb-6">
          Use your email and password to sign in
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login as <span className="text-red-500">*</span>
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
            >
              <option value="user">Donor</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
              required
            />
          </div>

          {/* Error message only */}
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
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={goto}
              className="text-red-600 hover:text-red-800 font-medium hover:underline focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </>
  );
}