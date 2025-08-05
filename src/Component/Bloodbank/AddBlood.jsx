import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";

export default function AddBlood({ onBloodAdded }) {
  const [bloodUnits, setBloodUnits] = useState({
    "A+": "", "A−": "", "B+": "", "B−": "",
    "AB+": "", "AB−": "", "O+": "", "O−": ""
  });

  // Handle value change
  const handleChange = (type, value) => {
    setBloodUnits({ ...bloodUnits, [type]: value });
  };

  // Submit blood data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: Check if token exists
    const token = localStorage.getItem("token");
    console.log("🔍 Debug - Token exists:", !!token);
    console.log("🔍 Debug - Token value:", token ? token.substring(0, 20) + "..." : "No token");

    const bloodData = Object.entries(bloodUnits)
      .filter(([type, units]) => units !== "" && !isNaN(units) && Number(units) > 0)
      .map(([type, units]) => ({
        bloodType: type,
        units: Number(units),
      }));

    if (bloodData.length === 0) {
      alert("⚠️ Please enter at least one blood unit.");
      return;
    }

    try {
      console.log("🔍 Debug - Sending blood data:", bloodData);
      console.log("🔍 Debug - Request URL:", "/bloodroutes/add-blood");
      console.log("🔍 Debug - Request payload:", { bloodData });
      
      const res = await axiosInstance.post(
        "/bloodroutes/add-blood",
        { bloodData }
      );

      console.log("🔍 Debug - Response received:", res.data);
      alert(res.data.message || "✅ Blood data added successfully.");

      // Reset form
      setBloodUnits({
        "A+": "", "A−": "", "B+": "", "B−": "",
        "AB+": "", "AB−": "", "O+": "", "O−": ""
      });

      // Notify parent to refresh data
      if (onBloodAdded) onBloodAdded();

    } catch (err) {
      console.error("❌ Error submitting blood data:", err);
      console.error("❌ Error response:", err.response?.data);
      alert("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-center mb-4 text-red-600"> 🩸 Add Available Blood</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(bloodUnits).map((type) => (
            <div key={type} className="grid grid-cols-2 gap-2 items-center">
              <input
                type="text"
                value={type}
                readOnly
                className="bg-red-300 text-center font-semibold px-3 py-2 rounded"
              />
              <input
                type="number"
                min="0"
                value={bloodUnits[type]}
                onChange={(e) => handleChange(type, e.target.value)}
                placeholder="Units Available"
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Submit Blood Data
          </button>
        </div>
      </form>
    </section>
  );
}
