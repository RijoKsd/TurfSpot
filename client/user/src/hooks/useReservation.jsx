import { useParams } from "react-router-dom";
import useDateSelection from "./useDateSelection";
import useTimeSelection from "./useTimeSelection";
import useDurationSelection from "./useDurationSelection";
import useBookingConfirmation from "./useBookingConfirmation";

const useReservation = () => {
  const { id } = useParams();

  const {
    selectedDate,
    handleDateChange,
  } = useDateSelection();

  const {
    selectedStartTime,
    availableTimes,
    timeSlots,
    bookedTime,
    handleTimeSelection,
    isTimeSlotBooked,
  } = useTimeSelection(selectedDate, id);

  const {
    duration,
    handleDurationChange,
    isDurationAvailable,
  } = useDurationSelection(selectedStartTime, timeSlots, isTimeSlotBooked);

  const {
    pricePerHour,
    confirmReservation,
  } = useBookingConfirmation(id, selectedDate, selectedStartTime, duration, timeSlots.pricePerHour);

  return {
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
  };
};

export default useReservation;