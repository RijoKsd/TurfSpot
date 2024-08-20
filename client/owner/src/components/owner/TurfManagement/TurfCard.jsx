import React, { useState } from "react";
import { Edit2, Trash2, Clock, MapPin, Tag } from "lucide-react";
 
const TurfCard = ({ turf, onEdit, onDelete }) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteWarning(false);
  };

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
        <h2 className="card-title text-lg">{turf.name}</h2>
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
        <div className="flex flex-wrap  gap-2">
          {turf.sportTypes.map((sports, index) => (
            <div key={index} className="badge badge-accent mt-2">
              {sports}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm" onClick={onEdit}>
            <Edit2 size={14} className="mr-1" /> Edit
          </button>
          <button className="btn btn-error btn-sm" onClick={handleDelete}>
            <Trash2 size={14} className="mr-1" /> Delete
          </button>
        </div>
      </div>

      {showDeleteWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this turf?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-ghost btn-sm mr-2"
                onClick={() => setShowDeleteWarning(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error btn-sm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfCard;
