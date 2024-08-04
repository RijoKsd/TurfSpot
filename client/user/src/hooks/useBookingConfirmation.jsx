import { format, parse, set, formatISO, addHours, parseISO } from "date-fns";
import toast from "react-hot-toast";
import axiosInstance from "./useAxiosInstance";
import { createOrder, handlePayment } from "../config/razorpay";
import "https://checkout.razorpay.com/v1/checkout.js";


const useBookingConfirmation = (
  id,
  selectedDate,
  selectedStartTime,
  duration,
  pricePerHour
   
) => {
 
  const confirmReservation = async () => {
    const selectedTurfDate = format(selectedDate, "yyyy-MM-dd");
    const parsedStartTime = parse(selectedStartTime, "hh:mm a", new Date());

    const combinedStartDateTime = set(parseISO(selectedTurfDate), {
      hours: parsedStartTime.getHours(),
      minutes: parsedStartTime.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });

    const combinedEndDateTime = addHours(combinedStartDateTime, duration);

    const startTimeISO = formatISO(combinedStartDateTime);
    const endTimeISO = formatISO(combinedEndDateTime);

    try {
      const order = await createOrder(pricePerHour * duration);
      const razorpayResponse = await handlePayment(order.order, order.user);

      const bookingData = {
        id,
        duration,
        startTime: startTimeISO,
        endTime: endTimeISO,
        totalPrice: pricePerHour * duration,
        selectedTurfDate,
        paymentId: razorpayResponse.razorpay_payment_id,
        orderId: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
      };
      console.log("Booking data:", bookingData);

      const response = await axiosInstance.post(
        "/api/user/booking/verify-payment",
        bookingData
      );
      console.log("Verify payment response:", response.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message);
      }
    }
  };

  return {
    confirmReservation,
  };
};

export default useBookingConfirmation;
