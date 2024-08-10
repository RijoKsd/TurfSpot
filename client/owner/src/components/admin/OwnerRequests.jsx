import React from "react";
import useOwnerRequests from "../../hooks/admin/useOwnerRequests";
import {
  CheckCircle,
  XCircle,
  User,
  Mail,
  Calendar,
  Info,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import OwnerRequestsSkeleton from "./OwnerRequestSkeleton";

const OwnerRequests = () => {
  const {
    requests,
    loading,
    handleAccept,
    handleDelete,
    requestId,
  } = useOwnerRequests();

  if (loading) return <OwnerRequestsSkeleton />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Owner Requests
      </h1>
      {requests.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <Info />
            <span>No pending owner requests.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div key={request._id} className="card bg-base-100 shadow-xl">
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
                  <Phone size={16} className="mr-2" />
                  {request.phone}
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {format(new Date(request.createdAt), "MMM dd, yyyy")}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleAccept(request._id)}
                    className="btn btn-sm btn-success relative"
                    disabled={requestId === request._id}
                  >
                    <CheckCircle size={16} className="mr-1" />
                    {requestId === request._id ? (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="loading loading-spinner loading-md"></span>
                      </span>
                    ) : (
                      "Accept"
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn  btn-sm btn-error relative"
                    disabled={requestId === request._id}
                  >
                    <XCircle size={16} className="mr-1" />

                    {requestId === request._id ? (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="loading loading-spinner loading-md"></span>
                      </span>
                    ) : (
                      "  Delete"
                    )}
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
