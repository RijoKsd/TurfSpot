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
    <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Edit Turf</h2>
        <input
          type="text"
          name="name"
          value={editedTurf.name}
          onChange={handleChange}
          placeholder="Turf Name"
          className="input input-bordered w-full mt-2"
        />
        <textarea
          name="description"
          value={editedTurf.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full mt-2"
        ></textarea>
        <input
          type="number"
          name="pricePerHour"
          value={editedTurf.pricePerHour}
          onChange={handleChange}
          placeholder="Price per Hour"
          className="input input-bordered w-full mt-2"
        />
        <input
          type="text"
          name="location"
          value={editedTurf.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full mt-2"
        />
        <input
          type="text"
          name="sportsType"
          value={editedTurf.sportsType}
          onChange={handleChange}
          placeholder="Sports Type"
          className="input input-bordered w-full mt-2"
        />
        <input
          type="time"
          name="openTime"
          value={editedTurf.openTime}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
        <input
          type="time"
          name="closeTime"
          value={editedTurf.closeTime}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
        <div className="card-actions justify-end mt-4">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTurfForm;