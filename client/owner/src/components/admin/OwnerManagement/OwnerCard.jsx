// src/components/OwnerViewer/OwnerCard.jsx
import React from "react";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const OwnerCard = ({ owner }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center">
          <User className="h-6 w-6 mr-2 " />
          <h2 className="card-title">{owner.name}</h2>
        </div>
        <div className="flex items-center mt-2">
          <Mail className="h-4 w-4 mr-2 text-gray-500" />
          <p>{owner.email}</p>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <p>{owner.phone}</p>
        </div>
        <div className="flex items-center mt-2">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <p>Created: {format(parseISO(owner.createdAt), "PPP")}</p>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/admin/owners/${owner._id}/turf`} className="btn btn-primary flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            View Turf
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerCard;
