import Navbar from "../Component/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import Footer from "../Component/Footer/Footer";

import er from "../assets/ab.png";


import axiosInstance from '../axiosInstance';
import DonorStatusCheck from "../Component/DonorStatus/DonorStatusCheck";

const DonorEligibility = () => {
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    bloodType: "",
    hospital: "",
    ageCriteria: false,
    donationGap: false,
    hemoglobin: false,
    healthCondition: false,
    identityProof: null,
    donorName: "",
    donorPhone: "",
    donorEmail: "",
  });

  // Fetch hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axiosInstance.get("/routeshospital/all-hospitals");
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  const isFormValid = () => {
    return (
      formData.bloodType &&
      formData.hospital &&
      formData.ageCriteria &&
      formData.donationGap &&
      formData.hemoglobin &&
      formData.healthCondition &&
      formData.identityProof &&
      formData.donorName &&
      formData.donorPhone
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const data = new FormData();
      data.append("bloodType", formData.bloodType);
      data.append("hospital", formData.hospital);
      data.append("ageCriteria", formData.ageCriteria);
      data.append("donationGap", formData.donationGap);
      data.append("hemoglobin", formData.hemoglobin);
      data.append("healthCondition", formData.healthCondition);
      data.append("identityProof", formData.identityProof);
      data.append("donorName", formData.donorName);
      data.append("donorPhone", formData.donorPhone);
      data.append("donorEmail", formData.donorEmail);

      const response = await axiosInstance.post("/donors/add-donor", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message || "Donor eligibility submitted successfully!");

      // Save donor phone to localStorage for automatic notifications
      localStorage.setItem("donorPhone", formData.donorPhone);

      setFormData({
        bloodType: "",
        hospital: "",
        ageCriteria: false,
        donationGap: false,
        hemoglobin: false,
        healthCondition: false,
        identityProof: null,
        donorName: "",
        donorPhone: "",
        donorEmail: "",
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while submitting the form."
      );
    }
  };

  return (

    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section - Added pt-20 to account for navbar */}
      <section className="relative text-center mb-12 min-h-[600px] rounded-b-[40px] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={er} className="w-full h-full object-cover object-center" alt="Donate Blood" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-red-600/50"></div>

        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Become a Donor. Save Lives.
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            Your one donation can save up to three lives.
          </p>
        </div>
      </section>

      {/* Eligibility Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-4 text-green-700">✅ Who Can Donate?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Age above 18 and below 60 years</li>
            <li>• At least 4 months since last donation</li>
            <li>• Hemoglobin level above 12g/dL</li>
            <li>• No serious medical conditions or pregnancy</li>
            <li>• Valid identity proof</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-4 text-red-700">⚠️ Risk Behaviors (Disqualified)</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Sex workers or their clients</li>
            <li>• Drug addicts</li>
            <li>• Engaging in sex with multiple partners</li>
          </ul>
        </div>
      </section>

      {/* Types of Donors */}
      <section className="bg-white p-8 max-w-5xl mx-auto rounded-2xl shadow-md mb-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Types of Donors</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Voluntary (Most Encouraged)</strong>
            <p>Safest and most encouraged form of donation. No payment involved.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Replacement</strong>
            <p>Donation for family members or friends in need.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Paid</strong>
            <p>Donation with monetary compensation.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
            <strong className="block text-red-600 mb-1">Directed</strong>
            <p>Donation for a specific patient's medical need.</p>

          </div>
        </div>
      </section>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-5xl mb-16 mx-auto px-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Eligibility Form</h2>

        {/* Blood Type */}

        <label className="block mb-4 font-medium text-gray-700">

          Select Blood Type
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg mt-2 p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            required
          >
            <option value="">Choose your blood type</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>


        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { name: "ageCriteria", label: "I meet the age criteria (18–60 years)" },
            { name: "donationGap", label: "4 months gap since last donation" },
            { name: "hemoglobin", label: "Hemoglobin level above 12g/dL" },
            { name: "healthCondition", label: "Free from serious conditions/pregnancy" }
          ].map((item) => (
            <label key={item.name} className="flex items-center bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <input
                type="checkbox"
                name={item.name}
                checked={formData[item.name]}
                onChange={handleChange}
                className="mr-3 w-5 h-5 text-red-600 focus:ring-red-500 rounded"
              />
              {item.label}
            </label>
          ))}

        <label className="block mb-3">
          Select Hospital
          <select
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="block w-full border rounded mt-1 p-2"
            required
          >
            <option value="">Choose your hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital._id} value={hospital._id}>
                {hospital.hospitalName} - {hospital.district}
              </option>
            ))}
          </select>
        </label>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="block">
            Full Name
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              className="block w-full border rounded mt-1 p-2"
              placeholder="Enter your full name"
              required
            />
          </label>

          <label className="block">
            Phone Number
            <input
              type="tel"
              name="donorPhone"
              value={formData.donorPhone}
              onChange={handleChange}
              className="block w-full border rounded mt-1 p-2"
              placeholder="Enter your phone number"
              required
            />
          </label>
        </div>

        <label className="block mb-4">
          Email Address (Optional)
          <input
            type="email"
            name="donorEmail"
            value={formData.donorEmail}
            onChange={handleChange}
            className="block w-full border rounded mt-1 p-2"
            placeholder="Enter your email address"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="ageCriteria"
              checked={formData.ageCriteria}
              onChange={handleChange}
              className="mr-2"
            />
            I meet the age criteria (18–60 years)
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="donationGap"
              checked={formData.donationGap}
              onChange={handleChange}
              className="mr-2"
            />
            4 months gap since last donation
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="hemoglobin"
              checked={formData.hemoglobin}
              onChange={handleChange}
              className="mr-2"
            />
            Hemoglobin level above 12g/dL
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="healthCondition"
              checked={formData.healthCondition}
              onChange={handleChange}
              className="mr-2"
            />
            Free from serious conditions/pregnancy
          </label>

        </div>

        {/* File Upload */}
        <label className="block mb-6 font-medium text-gray-700">
          Identity Proof
          <div className="flex items-center mt-3">
            <label className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 cursor-pointer transition">
              📂 Upload Identity Document
              <input
                type="file"
                name="identityProof"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
            {formData.identityProof && (
              <span className="ml-4 text-sm text-green-600 font-medium">
                {formData.identityProof.name}
              </span>
            )}
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}

          className={`w-full py-3 rounded-lg text-white font-semibold transition ${

            isFormValid()
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm Eligibility
        </button>
      </form>

      {/* Status Check Section */}
      <section className="max-w-4xl mx-auto mb-12">
        <DonorStatusCheck />
      </section>

      <Footer />
    </div>
  );
};

export default DonorEligibility;