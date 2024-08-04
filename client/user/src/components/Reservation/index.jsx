import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import DurationSelection from "./DurationSelection";
import ReservationSummary from "./ReservationSummary";
import useReservation from "../../hooks/useReservation";

const Reservation = () => {
  const {
    selectedDate,
    selectedStartTime,
    duration,
    availableTimes,
    timeSlots,
    pricePerHour,
    handleDateChange,
    handleTimeSelection,
    handleDurationChange,
    isTimeSlotBooked,
    isDurationAvailable,
    confirmReservation,
  } = useReservation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Reserve Turf</h2>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <DateSelection
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <TimeSelection
            availableTimes={availableTimes}
            selectedStartTime={selectedStartTime}
            handleTimeSelection={handleTimeSelection}
            isTimeSlotBooked={isTimeSlotBooked}
            timeSlots={timeSlots}
            duration={duration}
          />
          {selectedStartTime && (
            <DurationSelection
              selectedStartTime={selectedStartTime}
              duration={duration}
              handleDurationChange={handleDurationChange}
              isDurationAvailable={isDurationAvailable}
            />
          )}
          {selectedStartTime && duration > 0 && (
            <ReservationSummary
              selectedDate={selectedDate}
              selectedStartTime={selectedStartTime}
              duration={duration}
              pricePerHour={pricePerHour}
            />
          )}
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
            {/* <button
              className="btn btn-primary w-full"
              disabled={
                !selectedStartTime ||
                !duration ||
                isNaN(duration) ||
                !isDurationAvailable(selectedStartTime, duration)
              }
              onClick={() => {
                console.log("Confirming reservation with:", {
                  selectedDate,
                  selectedStartTime,
                  duration,
                  pricePerHour,
                });
                confirmReservation();
              }}
            >
              Confirm Reservation
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
