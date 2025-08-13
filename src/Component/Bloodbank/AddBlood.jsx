import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useToast } from "../Toast/ToastContext";

export default function AddBlood({ onBloodAdded }) {
  const { showSuccess, showError, showWarning } = useToast();
  const [bloodUnits, setBloodUnits] = useState({
    "A+": "", "A−": "", "B+": "", "B−": "",
    "AB+": "", "AB−": "", "O+": "", "O−": ""
  });

  const handleChange = (type, value) => {
    setBloodUnits({ ...bloodUnits, [type]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bloodData = Object.entries(bloodUnits)
      .filter(([type, units]) => units !== "" && !isNaN(units))
      .map(([type, units]) => ({
        bloodType: type,
        units: Number(units),
      }));

    if (bloodData.length === 0) {
      showWarning("Please enter at least one blood unit.");
      return;
    }

    try {
      await axiosInstance.post("/bloodroutes/add", { bloodData });

      // Show success message
      showSuccess("Blood units updated successfully!");

      // Reset form
      setBloodUnits({
        "A+": "", "A−": "", "B+": "", "B−": "",
        "AB+": "", "AB−": "", "O+": "", "O−": ""
      });

      if (onBloodAdded) onBloodAdded();
    } catch (err) {
      console.error("❌ Error:", err);
      showError("Failed to submit. Please try again.");
    }
  };

  return (
    <section className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto my-8 border border-gray-100">
      

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.keys(bloodUnits).map((type) => (
            <div
              key={type}
              className="flex items-center bg-gray-50 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-red-400"
            >
              <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-l-xl w-20 text-center text-lg">
                {type}
              </span>
              <input
                type="number"
                value={bloodUnits[type]}
                onChange={(e) => handleChange(type, e.target.value)}
                placeholder="Units (e.g. -1, 5)"
                className="flex-1 px-4 py-2 rounded-r-xl outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
          >
            Update Stock
          </button>
        </div>
      </form>
    </section>
  );
}
