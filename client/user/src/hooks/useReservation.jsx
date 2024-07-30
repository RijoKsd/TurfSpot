import { useState, useMemo, useEffect } from "react";
import { addDays, isSameDay, addHours, parseISO, format } from "date-fns";
import axiosInstance from "../hooks/useAxiosInstance";
import { useParams } from "react-router-dom";

const useReservation = () => {
   const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [duration, setDuration] = useState(1);
  // booked time in timeslots by user
  const [bookedTime, setBookedTime] = useState([]);
  // turf opentime and clostime in timeslots
  const [timeSlots, setTimeSlots] = useState([]);



  console.log(timeSlots, "timeSlots");
  console.log(bookedTime, "bookedTime");
 


  const availableTimes = useMemo(() => {
    const times = [];
    for (let i = 9; i <= 17; i++) {
      times.push(format(new Date().setHours(i, 0, 0, 0), "HH:mm"));
    }
    return times;
  }, []);

   const handleDateChange = (date) => {
      setSelectedDate(date);
    setSelectedStartTime(null);
    setDuration(1);
    console.log(selectedDate, "selected date");
    console.log(selectedStartTime, "selected start time");
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
    const start = parseISO(`2000-01-01T${selectedStartTime}`);
    const end = addHours(start, duration);
    const current = parseISO(`2000-01-01T${time}`);
    return current >= start && current < end;
  };

  const isStartTime = (time) => time === selectedStartTime;

  const isDurationDisabled = (hours) => {
    if (!selectedStartTime) return true;
    return parseISO(`2000-01-01T${selectedStartTime}`).getHours() + hours > 18;
  };


  // This function is used to fetch time slots by date and turfId
  const fetchByDate = async (currenSelectedDate, turfId) => {
    // converting current date to 2024-07-30 this model
    const date = format(currenSelectedDate, "yyyy-MM-dd");

    try {
      const response = await axiosInstance.get(
        `/api/user/turf/timeslot?date= ${date}&turfId=${turfId}`
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
  }, [selectedDate]);

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
