import toast from "react-hot-toast";
import axiosInstance from "../hooks/useAxiosInstance";

export const createOrder = async (totalPrice) => {
  const response = await axiosInstance.post("/api/user/booking/create-order", {
    totalPrice,
  });
    return response.data;
};

export const handlePayment = async (order,user) => {
   return new Promise((resolve, reject) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id, // Make sure this is included
      name: "TurfSpot",
      description: "Book a spot for your next adventure",

      handler: function (response) {
         if (response.error) {
          toast.error(response.error.message);
          reject(response.error);
        } else {
          resolve(response);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "",
      },
     
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  });
};
