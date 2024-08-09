import { useEffect, useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast";
import { format, parseISO, subHours, subMinutes } from "date-fns";

export default function useBookingHistory() {
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatBookingsData = (bookings) => {
    return bookings.map((booking) => {
      const adjustTime = (timeString) => {
        const date = parseISO(timeString);
        const adjustedDate = subMinutes(subHours(date, 5), 30);
        return adjustedDate;
      };

      const adjustedStartTime = adjustTime(booking.timeSlot.startTime);
      const adjustedEndTime = adjustTime(booking.timeSlot.endTime);

      return {
        ...booking,
        timeSlot: {
          ...booking.timeSlot,
          formattedStartTime: format(adjustedStartTime, "hh:mm a"),
          formattedEndTime: format(adjustedEndTime, "hh:mm a"),
          date: format(adjustedStartTime, "dd MMM yyyy"),
        },
      };
    });
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/user/booking/get-bookings"
      );
      const result = response.data;
      const formattedBookings = formatBookingsData(result);
      setBookings(formattedBookings);
    } catch (error) {
      console.error(error, "error");
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading };
}
