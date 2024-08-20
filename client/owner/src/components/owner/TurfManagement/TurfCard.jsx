import React, { useState } from "react";
import { Edit2, Trash2, Clock, MapPin, Tag } from "lucide-react";
 
const TurfCard = ({ turf }) => {
  const { deleteTurf, editTurf } = useTurfManagement();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    deleteTurf(turf.id);
    setShowDeleteWarning(false);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{turf.name}</h2>
        <p>{turf.description}</p>
        <div className="flex items-center mt-2">
          <MapPin size={16} className="mr-2" />
          <span>{turf.location}</span>
        </div>
        <div className="flex items-center mt-2">
          <Tag size={16} className="mr-2" />
          <span>₹{turf.pricePerHour}/hour</span>
        </div>
        <div className="flex items-center mt-2">
          <Clock size={16} className="mr-2" />
          <span>
            {turf.openTime} - {turf.closeTime}
          </span>
        </div>
        <div className="badge badge-accent mt-2">{turf.sportsType}</div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" onClick={() => editTurf(turf)}>
            <Edit2 size={16} className="mr-2" /> Edit
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
        </div>
      </div>

      {showDeleteWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this turf?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-ghost mr-2"
                onClick={() => setShowDeleteWarning(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmDelete}>
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