import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import DurationSelection from "./DurationSelection";
import ReservationSummary from "./ReservationSummary";
import useReservation from "../../hooks/useReservation";
import ReservationSkeleton from "../ui/ReservationSkeleton";

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
    loading,
  } = useReservation();

if( loading) return <ReservationSkeleton />;

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
              className="btn btn-primary w-full relative"
              disabled={
                !selectedStartTime ||
                !isDurationAvailable(selectedStartTime, duration) ||
                loading
              }
              onClick={confirmReservation}
            >
              {loading ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="loading loading-spinner loading-md"></span>
                </span>
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
