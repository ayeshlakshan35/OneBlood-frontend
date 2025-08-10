import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseForm, setResponseForm] = useState({
    accepted: false,
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
      const response = await axiosInstance.put(`/donors/respond-request/${requestId}`, responseForm);
      alert(response.data.message);
      setSelectedRequest(null);
      setResponseForm({
        accepted: false,
        scheduledDate: "",
        scheduledTime: "",
        message: "",
      });
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Error responding to request:", error);
      alert("Error responding to request. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Donor Requests</h2>
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-red-600">Donor Requests</h2>
      
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No donor requests found.</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {requests.map((request) => (
            <div key={request._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">
                    {request.donor.contactInfo?.name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Blood Type: <span className="font-semibold">{request.donor.bloodType}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {request.donor.contactInfo?.phone || "Not provided"}
                  </p>
                  {request.donor.contactInfo?.email && (
                    <p className="text-sm text-gray-600">
                      Email: {request.donor.contactInfo.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Eligibility Criteria:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className={request.donor.ageCriteria ? "text-green-600" : "text-red-600"}>
                    ✓ Age Criteria (18-60)
                  </span>
                  <span className={request.donor.donationGap ? "text-green-600" : "text-red-600"}>
                    ✓ 4 Months Gap
                  </span>
                  <span className={request.donor.hemoglobin ? "text-green-600" : "text-red-600"}>
                    ✓ Hemoglobin > 12g/dL
                  </span>
                  <span className={request.donor.healthCondition ? "text-green-600" : "text-red-600"}>
                    ✓ Good Health
                  </span>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="border-t pt-3">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Respond to Request
                  </button>
                </div>
              )}

              {request.hospitalResponse && request.hospitalResponse.accepted && (
                <div className="border-t pt-3 bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 mb-2">Scheduled Appointment:</h4>
                  <p className="text-sm text-green-700">
                    Date: {new Date(request.hospitalResponse.scheduledDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-green-700">
                    Time: {request.hospitalResponse.scheduledTime}
                  </p>
                  {request.hospitalResponse.message && (
                    <p className="text-sm text-green-700 mt-1">
                      Message: {request.hospitalResponse.message}
                    </p>
                  )}
                </div>
              )}

              {request.hospitalResponse && !request.hospitalResponse.accepted && (
                <div className="border-t pt-3 bg-red-50 p-3 rounded">
                  <h4 className="font-semibold text-red-800 mb-2">Request Rejected</h4>
                  {request.hospitalResponse.message && (
                    <p className="text-sm text-red-700">
                      Reason: {request.hospitalResponse.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Response Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Respond to Donor Request</h3>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={responseForm.accepted}
                  onChange={(e) => setResponseForm({...responseForm, accepted: e.target.checked})}
                  className="mr-2"
                />
                Accept this request
              </label>
            </div>

            {responseForm.accepted && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={responseForm.scheduledDate}
                    onChange={(e) => setResponseForm({...responseForm, scheduledDate: e.target.value})}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Scheduled Time</label>
                  <input
                    type="time"
                    value={responseForm.scheduledTime}
                    onChange={(e) => setResponseForm({...responseForm, scheduledTime: e.target.value})}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={responseForm.message}
                onChange={(e) => setResponseForm({...responseForm, message: e.target.value})}
                className="w-full border rounded p-2"
                rows="3"
                placeholder={responseForm.accepted ? "Instructions for the donor..." : "Reason for rejection..."}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleResponse(selectedRequest._id)}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Response
              </button>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setResponseForm({
                    accepted: false,
                    scheduledDate: "",
                    scheduledTime: "",
                    message: "",
                  });
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
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
