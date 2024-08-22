import React from "react";
import { Edit2, Trash2, Clock, MapPin, Tag, Star } from "lucide-react";

const TurfCard = ({ turf, onEdit }) => {
  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <figure className="px-4 pt-4">
        <img
          src={turf.image}
          alt={turf.name}
          className="rounded-xl object-cover w-full h-48"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-lg">{turf.name}</h2>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span className="text-sm font-semibold">
              {turf.avgRating ? turf.avgRating.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>
        <p className="text-sm">{turf.description}</p>
        <div className="flex items-center mt-2 text-sm">
          <MapPin size={14} className="mr-2" />
          <span>{turf.location}</span>
        </div>
        <div className="flex items-center mt-2 text-sm">
          <Tag size={14} className="mr-2" />
          <span>₹{turf.pricePerHour}/hour</span>
        </div>
        <div className="flex items-center mt-2 text-sm">
          <Clock size={14} className="mr-2" />
          <span>
            {turf.openTime} - {turf.closeTime}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {turf.sportTypes.map((sport, index) => (
            <div key={index} className="badge badge-accent mt-2">
              {sport}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(turf)}
          >
            <Edit2 size={14} className="mr-1" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
