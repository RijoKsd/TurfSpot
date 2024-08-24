import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { setHours, setMinutes } from "date-fns";
import { FormField } from "@components/common";
import useAddTurf from "@hooks/owner/useAddTurf";
import { Button } from "@components/common";
const AddTurf = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    onSubmit,
    sportTypes,
    newSportType,
    setNewSportType,
    addSportType,
    removeSportType,
    openTime,
    loading,
  } = useAddTurf();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Turf</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:grid md:grid-cols-2 gap-4"
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
              {...register("description")}
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
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const file = e.target.files[0];
                setValue("image", file);
              }}
              {...register("image", { required: true })}
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
                  onChange={(date) => {
                    field.onChange(date);
                    setValue("closeTime", null);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
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
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="input input-bordered w-full"
                  disabled={!openTime}
                  minTime={openTime || setHours(setMinutes(new Date(), 0), 0)}
                  maxTime={setHours(setMinutes(new Date(), 30), 23)}
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
            <div className="md:flex md:space-x-2">
              <input
                type="text"
                value={newSportType}
                onChange={(e) => setNewSportType(e.target.value)}
                className="input input-bordered md:flex-grow w-full "
                placeholder="Add a sport type"
              />
              <button
                type="button"
                onClick={addSportType}
                className="btn btn-outline btn-primary max-sm:mt-2"
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
            {errors.sportTypes && (
              <span className="text-error text-xs">
                {errors.sportTypes.message}
              </span>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <Button type="submit" className=" btn-primary w-full" loading={loading}>
            Add Turf
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTurf;
