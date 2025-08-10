import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const DonorStatusCheck = () => {
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationRequest, setNotificationRequest] = useState(null);

  // Check for donor requests on component mount
  useEffect(() => {
    // Try to get phone from localStorage if available
    const savedPhone = localStorage.getItem("donorPhone");
    if (savedPhone) {
      setPhone(savedPhone);
      checkStatusAutomatically(savedPhone);
    }
  }, []);

  const checkStatusAutomatically = async (phoneNumber) => {
    try {
      const response = await axiosInstance.get(`/donors/my-requests/${phoneNumber}`);
      const donorRequests = response.data;
      
      if (donorRequests.length > 0) {
        // Check if there are any accepted requests that should show notification
        const acceptedRequest = donorRequests.find(req => 
          req.status === "accepted" && req.hospitalResponse?.accepted
        );
        
        if (acceptedRequest) {
          setNotificationRequest(acceptedRequest);
          setShowNotification(true);
        }
        
        setRequests(donorRequests);
        setSearched(true);
      }
    } catch (error) {
      console.error("Error checking donor status automatically:", error);
    }
  };

  const checkStatus = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/donors/my-requests/${phone}`);
      const donorRequests = response.data;
      
      if (donorRequests.length > 0) {
        // Save phone to localStorage for future automatic checks
        localStorage.setItem("donorPhone", phone);
        
        // Check if there are any accepted requests that should show notification
        const acceptedRequest = donorRequests.find(req => 
          req.status === "accepted" && req.hospitalResponse?.accepted
        );
        
        if (acceptedRequest) {
          setNotificationRequest(acceptedRequest);
          setShowNotification(true);
        }
      }
      
      setRequests(donorRequests);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching donor requests:", error);
      alert("Error fetching your requests. Please try again.");
    } finally {
      setLoading(false);
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

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {/* Notification Banner for Accepted Requests */}
      {showNotification && notificationRequest && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎉 Great News! Your donation request has been approved!
              </h3>
              <div className="space-y-2 text-green-700">
                <p>
                  <strong>Hospital:</strong> {notificationRequest.donor.hospital?.hospitalName} - {notificationRequest.donor.hospital?.district}
                </p>
                <p>
                  <strong>Appointment Date:</strong> {new Date(notificationRequest.hospitalResponse.scheduledDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Appointment Time:</strong> {notificationRequest.hospitalResponse.scheduledTime}
                </p>
                {notificationRequest.hospitalResponse.message && (
                  <p>
                    <strong>Message from hospital:</strong> {notificationRequest.hospitalResponse.message}
                  </p>
                )}
              </div>
              <div className="mt-3 p-2 bg-green-100 rounded">
                <p className="text-sm text-green-800 font-semibold">
                  📞 Please contact the hospital if you need to reschedule or have any questions.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-4 text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 text-center text-red-600">Check Your Donation Request Status</h2>
      
      <form onSubmit={checkStatus} className="mb-6">
        <div className="flex gap-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="flex-1 border rounded p-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
          >
            {loading ? "Checking..." : "Check Status"}
          </button>
        </div>
      </form>

      {searched && (
        <div>
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No requests found for this phone number.</p>
              <p className="text-gray-400 text-sm mt-2">Please make sure you've submitted a donation request.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3">Your Requests:</h3>
              {requests.map((request) => (
                <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {request.donor.contactInfo?.name || "Anonymous"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Blood Type: <span className="font-semibold">{request.donor.bloodType}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Hospital: {request.donor.hospital?.hospitalName} - {request.donor.hospital?.district}
                      </p>
                      <p className="text-sm text-gray-600">
                        Submitted: {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {request.hospitalResponse && request.hospitalResponse.accepted && (
                    <div className="border-t pt-3 bg-green-50 p-3 rounded">
                      <h5 className="font-semibold text-green-800 mb-2">🎉 Your request has been accepted!</h5>
                      <p className="text-sm text-green-700 mb-2">
                        <strong>Appointment Date:</strong> {new Date(request.hospitalResponse.scheduledDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-green-700 mb-2">
                        <strong>Appointment Time:</strong> {request.hospitalResponse.scheduledTime}
                      </p>
                      {request.hospitalResponse.message && (
                        <p className="text-sm text-green-700">
                          <strong>Message from hospital:</strong> {request.hospitalResponse.message}
                        </p>
                      )}
                      <div className="mt-3 p-2 bg-green-100 rounded">
                        <p className="text-sm text-green-800 font-semibold">
                          📞 Please contact the hospital if you need to reschedule or have any questions.
                        </p>
                      </div>
                    </div>
                  )}

                  {request.hospitalResponse && !request.hospitalResponse.accepted && (
                    <div className="border-t pt-3 bg-red-50 p-3 rounded">
                      <h5 className="font-semibold text-red-800 mb-2">❌ Your request was not accepted</h5>
                      {request.hospitalResponse.message && (
                        <p className="text-sm text-red-700">
                          <strong>Reason:</strong> {request.hospitalResponse.message}
                        </p>
                      )}
                      <div className="mt-3 p-2 bg-red-100 rounded">
                        <p className="text-sm text-red-800 font-semibold">
                          💡 You can submit a new request to another hospital or try again later.
                        </p>
                      </div>
                    </div>
                  )}

                  {request.status === "pending" && (
                    <div className="border-t pt-3 bg-yellow-50 p-3 rounded">
                      <h5 className="font-semibold text-yellow-800 mb-2">⏳ Your request is under review</h5>
                      <p className="text-sm text-yellow-700">
                        The hospital is reviewing your eligibility. You will receive a notification once they respond.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonorStatusCheck;
