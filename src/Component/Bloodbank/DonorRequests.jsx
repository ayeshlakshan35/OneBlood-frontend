import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseForm, setResponseForm] = useState({
    accepted: false,
    rejected: false,
    scheduledDate: "",
    scheduledTime: "",
    message: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get("/donors/hospital-requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching donor requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (requestId) => {
    try {
      const responseData = {
        accepted: responseForm.accepted,
        scheduledDate: responseForm.accepted ? responseForm.scheduledDate : null,
        scheduledTime: responseForm.accepted ? responseForm.scheduledTime : null,
        message: responseForm.message,
      };

      const response = await axiosInstance.put(
        `/donors/respond-request/${requestId}`,
        responseData
      );
      alert(response.data.message);
      setSelectedRequest(null);
      setResponseForm({
        accepted: false,
        rejected: false,
        scheduledDate: "",
        scheduledTime: "",
        message: "",
      });
      fetchRequests();
    } catch (error) {
      console.error("Error responding to request:", error);
      alert("Error responding to request. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-red-600 mb-6 tracking-wide">
          Donor Requests
        </h2>
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-red-600 mb-8 text-center tracking-wide">
        Donor Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-400 italic text-lg">No donor requests found.</p>
      ) : (
        <div
          className="space-y-6 max-h-[520px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100"
          style={{ scrollbarWidth: "thin" }}
        >
          {requests.map((request) => (
            <div
              key={request._id}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {request.donor.contactInfo?.name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Blood Type:{" "}
                    <span className="font-semibold text-red-600">
                      {request.donor.bloodType}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Phone: {request.donor.contactInfo?.phone || "Not provided"}
                  </p>
                  {request.donor.contactInfo?.email && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      Email: {request.donor.contactInfo.email}
                    </p>
                  )}
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status.toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="font-semibold text-sm mb-2 text-gray-700 tracking-wide uppercase">
                  Eligibility Criteria
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <span
                    className={
                      request.donor.ageCriteria
                        ? "text-green-700 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    ✓ Age Criteria (18-60)
                  </span>
                  <span
                    className={
                      request.donor.donationGap
                        ? "text-green-700 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    ✓ 4 Months Gap
                  </span>
                  <span
                    className={
                      request.donor.hemoglobin
                        ? "text-green-700 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    ✓ Hemoglobin &gt; 12g/dL
                  </span>
                  <span
                    className={
                      request.donor.healthCondition
                        ? "text-green-700 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    ✓ Good Health
                  </span>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="border-t pt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setResponseForm({
                        accepted: true,
                        scheduledDate: "",
                        scheduledTime: "",
                        message: "",
                        rejected: false,
                      });
                    }}
                    className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-700 transition-colors duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setResponseForm({
                        accepted: false,
                        rejected: true,
                        scheduledDate: "",
                        scheduledTime: "",
                        message: "",
                      });
                    }}
                    className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg shadow hover:bg-gray-400 transition-colors duration-200"
                  >
                    Reject
                  </button>
                </div>
              )}

              {request.hospitalResponse && request.hospitalResponse.accepted && (
                <div className="border-t pt-4 bg-green-50 p-4 rounded-lg text-green-800">
                  <h4 className="font-semibold mb-2 text-green-900">
                    Scheduled Appointment
                  </h4>
                  <p className="text-sm">
                    Date:{" "}
                    {new Date(request.hospitalResponse.scheduledDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Time: {request.hospitalResponse.scheduledTime}</p>
                  {request.hospitalResponse.message && (
                    <p className="text-sm mt-1">Message: {request.hospitalResponse.message}</p>
                  )}
                </div>
              )}

              {request.hospitalResponse && !request.hospitalResponse.accepted && (
                <div className="border-t pt-4 bg-red-50 p-4 rounded-lg text-red-700">
                  {request.hospitalResponse.message && (
                    <p>Reason: {request.hospitalResponse.message}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Response Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-lg relative">
            <h3 className="text-2xl font-bold text-red-600 mb-6 tracking-wide">
              Respond to Donor Request
            </h3>

            <div className="mb-5 space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={responseForm.accepted}
                  onChange={(e) =>
                    setResponseForm({
                      ...responseForm,
                      accepted: e.target.checked,
                      rejected: e.target.checked ? false : responseForm.rejected,
                    })
                  }
                  className="h-5 w-5 rounded border-gray-300"
                />
                <span className="text-gray-700 font-medium">Accept this request</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={responseForm.rejected}
                  onChange={(e) =>
                    setResponseForm({
                      ...responseForm,
                      rejected: e.target.checked,
                      accepted: e.target.checked ? false : responseForm.accepted,
                    })
                  }
                  className="h-5 w-5 rounded border-gray-300"
                />
                <span className="text-gray-700 font-medium">Reject this request</span>
              </label>
            </div>

            {responseForm.accepted && (
              <>
                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    value={responseForm.scheduledDate}
                    onChange={(e) =>
                      setResponseForm({ ...responseForm, scheduledDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Scheduled Time
                  </label>
                  <input
                    type="time"
                    value={responseForm.scheduledTime}
                    onChange={(e) =>
                      setResponseForm({ ...responseForm, scheduledTime: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
              <textarea
                value={responseForm.message}
                onChange={(e) =>
                  setResponseForm({ ...responseForm, message: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="4"
                placeholder={
                  responseForm.accepted
                    ? "Instructions for the donor..."
                    : "Reason for rejecting the request..."
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleResponse(selectedRequest._id)}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-red-700 transition-colors duration-200"
              >
                Submit Response
              </button>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setResponseForm({
                    accepted: false,
                    rejected: false,
                    scheduledDate: "",
                    scheduledTime: "",
                    message: "",
                  });
                }}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRequests;
