import React from "react";
import useOwnerRequests from "../../hooks/admin/useOwnerRequests";
import { CheckCircle, XCircle, User, Mail, Calendar } from "lucide-react";

const OwnerRequests = () => {
  const { requests, loading, handleAccept, handleDelete } = useOwnerRequests();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Owner Requests
      </h1>
      {requests.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>No pending owner requests.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div key={request.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center">
                  <User size={20} className="mr-2" />
                  {request.name}
                </h2>
                <p className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2" />
                  {request.email}
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {new Date(request.requestDate).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="btn btn-sm btn-success"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="btn btn-sm btn-error"
                  >
                    <XCircle size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerRequests;
