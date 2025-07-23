import React, { useState } from "react";
import axios from "axios";

export default function AddBlood() {
  const [hospitalName, setHospitalName] = useState("");
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
      .filter(([type, units]) => units !== "" && !isNaN(units) && Number(units) > 0)
      .map(([type, units]) => ({
        bloodType: type,
        units: Number(units),
      }));

    try {
      const res = await axios.post("http://localhost:5000/api/admin/addblood", {
        hospitalName,
        bloodData
      });

      alert(res.data.message);
      setHospitalName("");
      setBloodUnits({
        "A+": "", "A−": "", "B+": "", "B−": "",
        "AB+": "", "AB−": "", "O+": "", "O−": ""
      });
    } catch (err) {
      console.error("Error submitting blood data:", err);
      alert("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-center mb-4">Add Available Blood</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Hospital Name</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Enter hospital name"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

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
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Submit Blood Data
          </button>
        </div>
      </form>
    </section>
  );
}
