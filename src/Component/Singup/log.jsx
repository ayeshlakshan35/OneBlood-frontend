import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Log({ goto }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("user"); // "user" or "hospital"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
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

      setSuccess("Login successful!");
      
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
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
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

            {/* Error and success messages */}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {success}
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
      </div>
    </div>
  );
}