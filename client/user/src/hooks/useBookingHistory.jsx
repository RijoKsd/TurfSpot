import { useEffect, useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast";
import { format, parseISO } from "date-fns";

export default function useBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatBookingsData = (bookings) => {
    return bookings.map((booking) => ({
      ...booking,
      timeSlot: {
        ...booking.timeSlot,
        formattedStartTime: format(
          parseISO(booking.timeSlot.startTime),
          "hh:mm a"
        ),
        formattedEndTime: format(parseISO(booking.timeSlot.endTime), "hh:mm a"),
        date: format(parseISO(booking.timeSlot.startTime), "dd MMM yyyy"),
      },
    }));
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
