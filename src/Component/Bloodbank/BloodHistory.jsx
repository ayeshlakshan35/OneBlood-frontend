import React from "react";

export default function BloodHistory() {
  const units = [
    { type: "A+", id: "UNIT-09345" },
    { type: "O-", id: "BTU-20230719" },
    { type: "B+", id: "UNIT-12847" },
    { type: "AB-", id: "BTU-20230720" },
    { type: "O+", id: "UNIT-15632" },
    { type: "A-", id: "BTU-20230721" },
    { type: "AB+", id: "UNIT-18924" },
    { type: "B-", id: "BTU-20230722" },
  ];

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Blood Unit History</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {units.map((unit, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-red-100 text-red-700 px-4 py-2 rounded"
          >
            <span className="font-semibold">{unit.type}</span>
            <span>{unit.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
}