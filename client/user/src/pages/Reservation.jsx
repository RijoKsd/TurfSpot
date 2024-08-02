
import { format, addDays, isSameDay, parse, addHours, isAfter } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useReservation from "../hooks/useReservation";

const Reservation = () => {
  const {
    selectedDate,
    selectedStartTime,
    duration,
    availableTimes,
    timeSlots,
    handleDateChange,
    handleTimeSelection,
    handleDurationChange,
    isTimeSlotBooked,
    isDurationAvailable,
    confirmReservation,
    pricePerHour,
  } = useReservation();

  const getEndTime = (startTime, hours) => {
    if (!startTime) return "";
    const start = parse(startTime, "hh:mm a", new Date());
    const end = addHours(start, hours);
    return format(end, "hh:mm a");
  };

  const isTimeSlotSelected = (time) => {
    if (!selectedStartTime || !duration) return false;
    const start = parse(selectedStartTime, "hh:mm a", new Date());
    const end = addHours(start, duration);
    const current = parse(time, "hh:mm a", new Date());
    return current >= start && current < end;
  };

  const isTimeSlotDisabled = (time) => {
    const closeTime = parse(timeSlots.closeTime, "hh:mm a", new Date());
    const currentTime = parse(time, "hh:mm a", new Date());
    return isAfter(currentTime, closeTime) || isTimeSlotBooked(time);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Reserve Turf</h2>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          {/* Date selection */}
          <div className="flex flex-col space-y-4 mb-6">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Select Date</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                className="btn btn-outline btn-sm w-full sm:w-auto"
                onClick={() => handleDateChange(addDays(selectedDate, -1))}
                disabled={isSameDay(selectedDate, new Date())}
              >
                PREV DATE
              </button>
              <div className="badge badge-primary text-lg p-4">
                {format(selectedDate, "dd-MM-yyyy")}
              </div>
              <button
                className="btn btn-outline btn-sm w-full sm:w-auto"
                onClick={() => handleDateChange(addDays(selectedDate, 1))}
              >
                NEXT DATE
              </button>
            </div>
          </div>

          {/* Available start times */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Start Time</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`btn btn-sm ${
                    isTimeSlotSelected(time)
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : isTimeSlotDisabled(time)
                      ? "btn-disabled"
                      : "btn-ghost"
                  }`}
                  onClick={() => handleTimeSelection(time)}
                  disabled={isTimeSlotDisabled(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Duration selection */}
          {selectedStartTime && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {[1, 2, 3].map((hours) => (
                  <button
                    key={hours}
                    className={`btn flex-1 ${
                      duration === hours ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => handleDurationChange(hours)}
                    disabled={!isDurationAvailable(selectedStartTime, hours)}
                  >
                    <div>
                      <div>
                        {hours} hour{hours > 1 ? "s" : ""}
                      </div>
                      <div className="text-sm">
                        {selectedStartTime} to{" "}
                        {getEndTime(selectedStartTime, hours)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected time summary */}
          {selectedStartTime && duration > 0 && (
            <div className="mt-6 p-4 bg-base-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Your Reservation</h3>
              <p>Date: {format(selectedDate, "dd-MM-yyyy")}</p>
              <p>
                Time: {selectedStartTime} to{" "}
                {getEndTime(selectedStartTime, duration)}
              </p>
              <p>
                Duration: {duration} hour{duration > 1 ? "s" : ""}
              </p>
              <p className = "font-bold"> Price: {pricePerHour * duration} INR</p>
            </div>
          )}

          {/* Confirm reservation button */}
          <div className="mt-6">
            <button
              className="btn btn-primary w-full"
              disabled={
                !selectedStartTime ||
                !isDurationAvailable(selectedStartTime, duration)
              }
              onClick={confirmReservation}
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
