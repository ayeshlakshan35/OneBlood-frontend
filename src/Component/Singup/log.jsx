import React, { useState, useEffect } from "react";
import axiosInstance, { setSessionData, getSessionData } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast/ToastContext";



// Enhanced Login Component
export default function Log({ goto }) {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");
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

      // Show success toast
      showSuccess(`Welcome back! Redirecting to ${userType === "hospital" ? "hospital" : "donor"} dashboard...`);
      
              if (res.data.token) {
          // Store data in sessionStorage using tab-specific session management
          setSessionData("token", res.data.token);
          setSessionData("userType", userType);
          
          if (res.data.user) {
            setSessionData("user", res.data.user);
          }
          if (res.data.hospital) {
            setSessionData("hospital", res.data.hospital);
          }

          // Debug logging
          console.log('Login successful - sessionStorage set:', {
            token: res.data.token,
            userType: userType,
            user: res.data.user,
            hospital: res.data.hospital
          });

          // Verify sessionStorage was set correctly
          setTimeout(() => {
            const storedToken = getSessionData('token');
            const storedUserType = getSessionData('userType');
            const storedUser = getSessionData('user');
            
            console.log('Verifying sessionStorage after login:', {
              storedToken,
              storedUserType,
              storedUser
            });
            
            if (storedToken && storedUserType) {
              navigate(userType === "hospital" ? "/BloodB" : "/Home");
            } else {
              console.error('sessionStorage verification failed');
              setError('Login successful but session setup failed. Please try again.');
            }
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