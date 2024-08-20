import { useState } from "react";

const EditTurfForm = ({ turf, onSave, onCancel }) => {
  const [editedTurf, setEditedTurf] = useState(turf);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTurf((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTurf);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl h-full">
      <div className="card-body p-4">
        <h2 className="card-title text-lg mb-4">Edit Turf</h2>
        <input
          type="text"
          name="name"
          value={editedTurf.name}
          onChange={handleChange}
          placeholder="Turf Name"
          className="input input-bordered w-full mt-2 text-sm"
        />
        <textarea
          name="description"
          value={editedTurf.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full mt-2 text-sm"
        ></textarea>
        <input
          type="number"
          name="pricePerHour"
          value={editedTurf.pricePerHour}
          onChange={handleChange}
          placeholder="Price per Hour"
          className="input input-bordered w-full mt-2 text-sm"
        />
        <input
          type="text"
          name="location"
          value={editedTurf.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full mt-2 text-sm"
        />
        <input
          type="text"
          name="sportsType"
          value={editedTurf.sportsType}
          onChange={handleChange}
          placeholder="Sports Type"
          className="input input-bordered w-full mt-2 text-sm"
        />
        <input
          type="time"
          name="openTime"
          value={editedTurf.openTime}
          onChange={handleChange}
          className="input input-bordered w-full mt-2 text-sm"
        />
        <input
          type="time"
          name="closeTime"
          value={editedTurf.closeTime}
          onChange={handleChange}
          className="input input-bordered w-full mt-2 text-sm"
        />
        <div className="card-actions justify-end mt-4">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};
export default EditTurfForm;
