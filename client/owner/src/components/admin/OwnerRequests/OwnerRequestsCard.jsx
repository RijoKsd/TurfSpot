import React from "react";
import { format } from "date-fns";
import {
  CheckCircle,
  XCircle,
  User,
  Mail,
  Calendar,
  Phone,
} from "lucide-react";

const OwnerRequestCard = ({ request, onAccept, onDelete, isProcessing }) => {
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
          <Phone size={16} className="mr-2" />
          {request.phone}
        </p>
        <p className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2" />
          {format(new Date(request.createdAt), "MMM dd, yyyy")}
        </p>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => onAccept(request._id)}
            className="btn btn-sm btn-success relative text-base-200"
            disabled={isProcessing}
          >
            <CheckCircle size={16} className="mr-1" />
            {isProcessing ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </span>
            ) : (
              "Accept"
            )}
          </button>
          <button
            onClick={() => onDelete(request._id)}
            className="btn btn-sm btn-error relative text-base-200"
            disabled={isProcessing}
          >
            <XCircle size={16} className="mr-1" />
            {isProcessing ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerRequestCard;
