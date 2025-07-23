import React from "react";
import { UploadCloud } from "lucide-react";

export default function AddCamp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <section className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Add Blood Donation Campaign
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter campaign title"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter organizing hospital"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="datetime-local"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter venue location"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <textarea
            placeholder="Enter campaign description and details..."
            className="border px-3 py-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Contact person name and phone"
            className="border px-3 py-2 rounded w-full"
          />

          <div className="border rounded p-4 text-center text-gray-500 cursor-pointer text-sm">
            <UploadCloud className="mx-auto mb-2" />
            Click to upload poster <br />
            (PNG, JPG up to 10MB)
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
