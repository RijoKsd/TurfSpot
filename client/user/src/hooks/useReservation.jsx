import { useState, useEffect, useMemo } from "react";
import {
  addDays,
  isSameDay,
  format,
  parse,
  isBefore,
  isAfter,
  parseISO,
  addMinutes,
  addHours,
  setHours,
  setMinutes,
} from "date-fns";
import axiosInstance from "../hooks/useAxiosInstance";
import { useParams } from "react-router-dom";

const useReservation = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [duration, setDuration] = useState(1);
  const [bookedTime, setBookedTime] = useState([]);
  const [timeSlots, setTimeSlots] = useState({ openTime: "", closeTime: "" });

  const availableTimes = useMemo(() => {
    if (!timeSlots.openTime || !timeSlots.closeTime) return [];

    const times = [];
    const openTime = parse(timeSlots.openTime, "hh:mm a", new Date());
    const closeTime = parse(timeSlots.closeTime, "hh:mm a", new Date());

    let currentTime = openTime;

    while (isBefore(currentTime, closeTime)) {
      times.push(format(currentTime, "hh:mm a"));
      currentTime = addHours(currentTime, 1);
    }

    return times;
  }, [timeSlots.openTime, timeSlots.closeTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedStartTime(null);
    setDuration(1);
  };

  const handleTimeSelection = (time) => {
    setSelectedStartTime(time);
    setDuration(1);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const isTimeSlotBooked = (time) => {
    const timeToCheck = parse(time, "hh:mm a", new Date());
    return bookedTime.some((booking) => {
      const bookingStart = parse(booking.startTime, "hh:mm a", new Date());
      const bookingEnd = parse(booking.endTime, "hh:mm a", new Date());

      return (
        (isAfter(timeToCheck, bookingStart) ||
          isSameTime(timeToCheck, bookingStart)) &&
        isBefore(timeToCheck, bookingEnd)
      );
    });
  };

  const isDurationAvailable = (startTime, hours) => {
    const start = parse(startTime, "hh:mm a", new Date());
    const end = addHours(start, hours);

    // Check if the end time exceeds the closing time
    const closeTime = parse(timeSlots.closeTime, "hh:mm a", new Date());
    if (isAfter(end, closeTime) || isSameTime(end, closeTime)) return false;

    // Check if the selected duration overlaps with any booked time
    for (let i = 0; i < hours; i++) {
      const checkTime = addHours(start, i);
      if (isTimeSlotBooked(format(checkTime, "hh:mm a"))) {
        return false;
      }
    }

    return true;
  };

  const isSameTime = (time1, time2) => {
    return (
      time1.getHours() === time2.getHours() &&
      time1.getMinutes() === time2.getMinutes()
    );
  };

  const fetchByDate = async (currentSelectedDate, turfId) => {
    const date = format(currentSelectedDate, "yyyy-MM-dd");

    try {
      const response = await axiosInstance.get(
        `/api/user/turf/timeslot?date=${date}&turfId=${turfId}`
      );
      const result = await response.data;

      setTimeSlots(result.timeSlots);

      // Convert startTime and endTime to "hh:mm a" format
      const formattedBookedTime = result.bookedTime.map((booking) => ({
        ...booking,
        startTime: format(
          addMinutes(
            parseISO(booking.startTime),
            parseISO(booking.startTime).getTimezoneOffset()
          ),
          "hh:mm a",
          { timeZone: "UTC" }
        ),
        endTime: format(
          addMinutes(
            parseISO(booking.endTime),
            parseISO(booking.endTime).getTimezoneOffset()
          ),
          "hh:mm a",
          { timeZone: "UTC" }
        ),
      }));
      setBookedTime(formattedBookedTime);
    } catch (error) {
      console.log("Error in fetchByDate", error.message);
    }
  };

  const confirmReservation = () => {
    if (selectedStartTime && duration) {
      const startTime = parse(selectedStartTime, "hh:mm a", new Date());
      const endTime = addHours(startTime, duration);
      console.log("Confirmed Reservation:", {
        date: format(selectedDate, "yyyy-MM-dd"),
        startTime: format(startTime, "hh:mm a"),
        endTime: format(endTime, "hh:mm a"),
        duration: `${duration} hour${duration > 1 ? "s" : ""}`,
      });
      // Here you can also add logic to send this data to your backend
    }
  };

  useEffect(() => {
    fetchByDate(selectedDate, id);
  }, [selectedDate, id]);

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
  };
};

export default useReservation;
