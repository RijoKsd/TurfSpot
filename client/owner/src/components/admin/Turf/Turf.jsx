import React from "react";
import { MapPin, Clock, Star, Calendar } from "lucide-react";
import { format } from "date-fns";

const Turf = ({ turf }) => {
  return (
    <div className="card bg-base-100 shadow-xl w-full hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48 sm:h-56 md:h-64">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-base-100 text-primary font-semibold px-3 py-1 m-2 rounded-full">
          ₹{turf.pricePerHour}/hr
        </div>
      </figure>
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl mb-2">{turf.name}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          {turf.description}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-primary" />
            <span>{turf.location}</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-primary" />
            <span>
              {turf.openTime} - {turf.closeTime}
            </span>
          </div>
          <div className="flex items-center">
            <Star size={18} className="mr-2 text-primary" />
            <span>{turf.avgRating} ratings</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-primary" />
            <span>{format(new Date(turf.createdAt), "dd MMM yyyy")}</span>
          </div>
        </div>
         
      </div>
    </div>
  );
};

export default Turf;
