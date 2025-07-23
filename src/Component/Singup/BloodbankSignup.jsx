import React from "react";
import axios from "axios";

import { useState } from "react";
export default function BloodbankSignup({ gotoBloodBank, goto }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
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
      return;
    }

    try {
      // Use FormData for file upload
      const data = new FormData();
      data.append("hospitalName", formData.hospitalName);
      data.append("address", formData.address);
      data.append("district", formData.district);
      data.append("validDocuments", formData.validDocuments);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("email", formData.email);
      data.append("password", formData.password);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(res.data.message || "Registration successful!");
      setError("");
      // Delay redirect so user can see the success message
      setTimeout(() => {
        goto();
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div>
      <div className="space-x-3">
        <span
          className="text-center text-gray-500 cursor-pointer"
          onClick={gotoBloodBank}
        >
          User
        </span>
        <span
          className="text-2xl font-bold text-center space-x-10 cursor-pointer"
          onClick={gotoBloodBank}
        >
          Blood bank
        </span>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 w-full max-w-md md:max-w-2xl px-6 sm:px-10 py-10 rounded-lg shadow-md space-y-4"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
            Sign up
          </h1>

          {/* Hospital Name */}
          <label className="block mb-1 font-medium">Hospital Name*</label>
          <input
            type="text"
            placeholder="Enter hospital name"
            className="w-full p-2 border rounded"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
          />

          {/* Address & District */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block mb-1 font-medium">Address*</label>
              <input
                type="text"
                placeholder="Enter hospital address"
                className="w-full p-2 border rounded"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block mb-1 font-medium">District*</label>
              <select
                className="w-full p-2 border rounded"
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block mb-1 font-medium">Valid Documents*</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                name="validDocuments"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-1 font-medium">Phone Number*</label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full p-2 border rounded"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <label className="block mb-1 font-medium">Email Address*</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full p-2 border rounded"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Passwords */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block mb-1 font-medium">Password*</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-2 border rounded"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block mb-1 font-medium">
                Confirm Password*
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-2 border rounded"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Display error and success messages */}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          {/* Submit Button */}
          <button
            className="w-full py-2 rounded bg-red-800 text-white transition"
            type="submit"
          >
            Register
          </button>

          {/* Navigation to Sign In */}
          <p className="text-center text-sm sm:text-base">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={goto}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
