import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";

export default function BloodbankSignup({ gotoBloodBank, goto }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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
      setSuccess(res.data.message || "Registration successful!");
      setError("");
      setTimeout(() => {
        goto();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
}