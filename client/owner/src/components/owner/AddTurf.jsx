import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format, parse, addMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import FormField from "../FormField";
import useAddTurf from "../../hooks/useAddTurf";

const AddTurf = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [sportTypes, setSportTypes] = useState([]);
  const [newSportType, setNewSportType] = useState("");
  const { addTurf, isLoading, error } = useAddTurf();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append(key, data[key][0]);
      } else if (key === "openTime" || key === "closeTime") {
        formData.append(key, format(data[key], "HH:mm"));
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append("sportTypes", JSON.stringify(sportTypes));
    await addTurf(formData);
  };

  const addSportType = () => {
    if (newSportType && !sportTypes.includes(newSportType)) {
      setSportTypes([...sportTypes, newSportType]);
      setNewSportType("");
    }
  };

  const removeSportType = (type) => {
    setSportTypes(sportTypes.filter((sport) => sport !== type));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Turf</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="space-y-4">
          <FormField
            label="Turf Name"
            name="name"
            type="text"
            register={register}
            error={errors.name}
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered h-24"
              placeholder="Enter turf description"
            ></textarea>
            {errors.description && (
              <span className="text-error text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <FormField
            label="Location"
            name="location"
            type="text"
            register={register}
            error={errors.location}
          />
          <FormField
            label="Price Per Hour"
            name="pricePerHour"
            type="number"
            register={register}
            error={errors.pricePerHour}
          />
        </div>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <span className="text-error text-xs">{errors.image.message}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Open Time</span>
            </label>
            <Controller
              name="openTime"
              control={control}
              rules={{ required: "Open time is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.openTime && (
              <span className="text-error text-xs">
                {errors.openTime.message}
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Close Time</span>
            </label>
            <Controller
              name="closeTime"
              control={control}
              rules={{ required: "Close time is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.closeTime && (
              <span className="text-error text-xs">
                {errors.closeTime.message}
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sport Types</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSportType}
                onChange={(e) => setNewSportType(e.target.value)}
                className="input input-bordered flex-grow"
                placeholder="Add a sport type"
              />
              <button
                type="button"
                onClick={addSportType}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {sportTypes.map((type, index) => (
                <span key={index} className="badge badge-lg">
                  {type}
                  <button
                    type="button"
                    onClick={() => removeSportType(type)}
                    className="ml-2 text-error"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? "Adding Turf..." : "Add Turf"}
          </button>
          {error && <p className="text-error mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddTurf;
