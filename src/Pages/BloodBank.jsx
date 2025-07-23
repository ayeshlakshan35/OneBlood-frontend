import React, { useState } from "react";
import AddBlood from "../Component/Bloodbank/AddBlood";
import BloodHistory from "../Component/Bloodbank/BloodHistory";
import AddCamp from "../Component/Bloodbank/AddCamp";

export default function BloodBank() {
  const [activeTab, setActiveTab] = useState("blood");

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white text-center py-10 px-4">
        <h1 className="text-4xl font-bold">Give Blood. Save Lives.</h1>
        <p className="mt-2 text-sm">Add available blood and Blood Campaign</p>
        <div className="mt-6 flex justify-center flex-wrap gap-4">
          <button
            onClick={() => setActiveTab("blood")}
            className={`px-5 py-2 rounded font-semibold shadow ${
              activeTab === "blood"
                ? "bg-white text-red-600"
                : "bg-red-700 text-white"
            }`}
          >
            Add Blood
          </button>

          <button
            onClick={() => setActiveTab("camp")}
            className={`px-5 py-2 rounded font-semibold shadow ${
              activeTab === "camp"
                ? "bg-white text-red-600"
                : "bg-red-700 text-white"
            }`}
          >
            Add Blood Campaign
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === "blood" && (
          <>
            <AddBlood />
            <BloodHistory />
          </>
        )}
        {activeTab === "camp" && (
          <div className="lg:col-span-2">
            <AddCamp />
          </div>
        )}
      </main>
    </div>
  );
}
