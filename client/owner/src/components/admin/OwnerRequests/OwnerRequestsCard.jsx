import React from "react";
import { format } from "date-fns";
import {
  User,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

const OwnerRequestCard = ({
  request,
  onAccept,
  onReject,
  onReconsider,
  isProcessing,
  isRejected,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
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
          {format(new Date(request.createdAt), "MMM dd, yyyy")}
        </p>
        <div className="card-actions justify-end mt-4">
          {isRejected ? (
            <button
              onClick={() => onReconsider(request._id)}
              className="btn btn-sm btn-primary relative"
              disabled={isProcessing}
            >
              <RefreshCw size={16} className="mr-1" />
              {isProcessing ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Reconsider"
              )}
            </button>
          ) : (
            <>
              <button
                onClick={() => onAccept(request._id)}
                className="btn btn-sm btn-success relative text-base-200"
                disabled={isProcessing}
              >
                <CheckCircle size={16} className="mr-1" />
                {isProcessing ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Accept"
                )}
              </button>
              <button
                onClick={() => onReject(request._id)}
                className="btn btn-sm btn-error relative text-base-200"
                disabled={isProcessing}
              >
                <XCircle size={16} className="mr-1" />
                {isProcessing ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Reject"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerRequestCard;
