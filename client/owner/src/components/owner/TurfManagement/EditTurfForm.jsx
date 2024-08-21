import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import {  useState } from "react";

const EditTurfForm = ({ turf, onSave, onCancel, turfId }) => {
  const [editedTurf, setEditedTurf] = useState({
    ...turf,
    openTime: turf.openTime
      ? parse(turf.openTime, "hh:mm a", new Date())
      : null,
    closeTime: turf.closeTime
      ? parse(turf.closeTime, "hh:mm a", new Date())
      : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTurf((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (time, field) => {
    setEditedTurf((prev) => ({
      ...prev,
      [field]: time,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editedTurf,
      openTime: editedTurf.openTime
        ? format(editedTurf.openTime, "hh:mm a")
        : null,
      closeTime: editedTurf.closeTime
        ? format(editedTurf.closeTime, "hh:mm a")
        : null,
    }, turfId);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const isTurfExisting = !!turf._id;

    return currentDate.getTime() < selectedDate.getTime() || isTurfExisting;
  };

  const filterCloseTime = (time) => {
    if (!editedTurf.openTime) return false;
    return editedTurf.openTime.getTime() < time.getTime();
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
          onChange={handleChange}
          placeholder="Sports Type"
          className="input input-bordered w-full mt-2 text-sm"
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Open Time</span>
            </label>
            <DatePicker
              selected={editedTurf.openTime}
              onChange={(time) => handleTimeChange(time, "openTime")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="input input-bordered w-full text-sm"
              filterTime={filterPassedTime}
            />
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Close Time</span>
            </label>
            <DatePicker
              selected={editedTurf.closeTime}
              onChange={(time) => handleTimeChange(time, "closeTime")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="input input-bordered w-full text-sm"
              filterTime={filterCloseTime}
              disabled={!editedTurf.openTime}
            />
          </div>
        </div>

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
