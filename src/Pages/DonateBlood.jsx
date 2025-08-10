import Navbar from "../Component/Navbar/Navbar";
import React, { useState } from "react";
import Footer from "../Component/Footer/Footer";
import er from "../assets/er.png";
import axiosInstance from '../axiosInstance';

const DonorEligibility = () => {
  const [formData, setFormData] = useState({
    bloodType: "",
    district: "",
    ageCriteria: false,
    donationGap: false,
    hemoglobin: false,
    healthCondition: false,
    identityProof: null,
  });

  const isFormValid = () => {
    return (
      formData.bloodType &&
      formData.district &&
      formData.ageCriteria &&
      formData.donationGap &&
      formData.hemoglobin &&
      formData.healthCondition &&
      formData.identityProof
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
      data.append("district", formData.district);
      data.append("ageCriteria", formData.ageCriteria);
      data.append("donationGap", formData.donationGap);
      data.append("hemoglobin", formData.hemoglobin);
      data.append("healthCondition", formData.healthCondition);
      data.append("identityProof", formData.identityProof);

      const response = await axiosInstance.post("/donors/add-donor", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message || "Donor eligibility submitted successfully!");

      setFormData({
        bloodType: "",
        district: "",
        ageCriteria: false,
        donationGap: false,
        hemoglobin: false,
        healthCondition: false,
        identityProof: null,
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
    <div>
      <Navbar />
      <section className="relative text-center mb-12 min-h-[400px] bg-red-400 py-12 rounded overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30">
          <img src={er} className="w-full" alt="Emergency" />
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Become a Donor. Save Lives.
          </h1>
          <p className="text-white">
            Your one donation can save up to three lives.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-green-50 p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-3">Who Can Donate?</h2>
          <ul className="list-disc pl-5 text-green-700">
            <li>Age above 18 and below 60 years</li>
            <li>At least 4 months since last donation</li>
            <li>Hemoglobin level above 12g/dL</li>
            <li>No serious medical conditions or pregnancy</li>
            <li>Valid identity proof</li>
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-3 text-red-700">
            Risk Behaviors (Disqualified)
          </h2>
          <ul className="list-disc pl-5 text-red-600">
            <li>Sex workers or their clients</li>
            <li>Drug addicts</li>
            <li>Engaging in sex with multiple partners</li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 p-6 max-w-4xl mx-auto rounded shadow">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Types of Donors
        </h2>
        <div className="list-disc pl-5 text-gray-700 space-y-3">
          <div>
            <strong>Voluntary (Most Encouraged)</strong>
            <p>Safest and most encouraged form of donation. No payment involved.</p>
          </div>
          <div>
            <strong>Replacement</strong>
            <p>Donation for family members or friends in need.</p>
          </div>
          <div>
            <strong>Paid</strong>
            <p>Donation with monetary compensation.</p>
          </div>
          <div>
            <strong>Directed</strong>
            <p>Donation for a specific patient’s medical need.</p>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-4xl mb-12 mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Eligibility Form
        </h2>

        {/* Blood Type */}
        <label className="block mb-3">
          Select Blood Type
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="block w-full border rounded mt-1 p-2"
            required
          >
            <option value="">Choose your blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>

        {/* District */}
        <label className="block mb-3">
          Select District
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="block w-full border rounded mt-1 p-2"
            required
          >
            <option value="">Choose your district</option>
            <option value="Ampara">Ampara</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Badulla">Badulla</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Hambantota">Hambantota</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Kandy">Kandy</option>
            <option value="Kegalle">Kegalle</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Mannar">Mannar</option>
            <option value="Matale">Matale</option>
            <option value="Matara">Matara</option>
            <option value="Monaragala">Monaragala</option>
            <option value="Mullaitivu">Mullaitivu</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Puttalam">Puttalam</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Vavuniya">Vavuniya</option>
          </select>
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

        <label className="block mb-4">
          Identity Proof
          <div className="flex items-center mt-2">
            <label className="inline-flex items-center cursor-pointer">
              <span className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                📂 Upload Identity Document
              </span>
              <input
                type="file"
                name="identityProof"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
            {formData.identityProof && (
              <span className="ml-4 text-sm text-green-700">
                {formData.identityProof.name}
              </span>
            )}
          </div>
        </label>

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isFormValid()
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm Eligibility
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default DonorEligibility;
