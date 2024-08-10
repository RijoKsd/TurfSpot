import React from "react";
import useOwnerRequests from "../../../hooks/admin/useOwnerRequests";
import { Info } from "lucide-react";
import OwnerRequestsSkeleton from "./OwnerRequestSkeleton";
import OwnerRequestCard from "./OwnerRequestsCard";

const OwnerRequests = () => {
  const { requests, loading, handleAccept, handleDelete, requestId } =
    useOwnerRequests();

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
            <OwnerRequestCard
              key={request._id}
              request={request}
              onAccept={handleAccept}
              onDelete={handleDelete}
              isProcessing={requestId === request._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerRequests;
