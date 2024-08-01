import { useState, useEffect, useMemo } from "react";
import {
  addDays,
  isSameDay,
  addHours,
  parseISO,
  format,
  parse,
  isBefore,
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

    while (
      isBefore(currentTime, closeTime) ||
      currentTime.getTime() === closeTime.getTime()
    ) {
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

  const isTimeSlotSelected = (time) => {
    if (!selectedStartTime) return false;
    const start = parse(selectedStartTime, "hh:mm a", new Date());
    const end = addHours(start, duration);
    const current = parse(time, "hh:mm a", new Date());
    return current >= start && current < end;
  };

  const isStartTime = (time) => time === selectedStartTime;

  const isDurationDisabled = (hours) => {
    if (!selectedStartTime) return true;
    const start = parse(selectedStartTime, "hh:mm a", new Date());
    return start.getHours() + hours > 18;
  };

  const fetchByDate = async (currentSelectedDate, turfId) => {
    const date = format(currentSelectedDate, "yyyy-MM-dd");

    try {
      const response = await axiosInstance.get(
        `/api/user/turf/timeslot?date=${date}&turfId=${turfId}`
      );
      const result = await response.data;
      setTimeSlots(result.timeSlots);
      setBookedTime(result.bookedTime);
 
     } catch (error) {
      console.log("Error in fetchByDate", error.message);
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
    handleDateChange,
    handleTimeSelection,
    handleDurationChange,
    isTimeSlotSelected,
    isStartTime,
    isDurationDisabled,
  };
};

export default useReservation;
