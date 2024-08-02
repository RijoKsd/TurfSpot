import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {
  format,
  parse,
  isBefore,
  isAfter,
  parseISO,
  addMinutes,
  addHours,
  set,
  formatISO,
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

 

  const confirmReservation = async () => {
   const selectedTurfDate = format(selectedDate, "yyyy-MM-dd");
   const parsedStartTime = parse(selectedStartTime, "hh:mm a", new Date());

   // Combine the selected date with the parsed start time
   const combinedStartDateTime = set(parseISO(selectedTurfDate), {
     hours: parsedStartTime.getHours(),
     minutes: parsedStartTime.getMinutes(),
     seconds: 0,
     milliseconds: 0,
   });

   // Calculate end time
   const combinedEndDateTime = addHours(combinedStartDateTime, duration);

   // Format times for display
  //  const startTime = format(combinedStartDateTime, "hh:mm a");
  //  const endTime = format(combinedEndDateTime, "hh:mm a");

   // Convert to ISO format
   const startTimeISO = formatISO(combinedStartDateTime);
   const endTimeISO = formatISO(combinedEndDateTime);
 
    try {
      const response = await axiosInstance.post("/api/user/turf/booking", {
        id,
        duration,
        startTime: startTimeISO,
        endTime: endTimeISO,

        selectedTurfDate,
      });
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message);
      }
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
