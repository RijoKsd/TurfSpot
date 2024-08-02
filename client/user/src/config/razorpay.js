import toast from "react-hot-toast";
import axiosInstance from "../hooks/useAxiosInstance";

export const createOrder = async (totalPrice) => {
  const response = await axiosInstance.post("/api/user/booking/create-order", {
    totalPrice,
  });
    return response.data.order;
};

export const handlePayment = async (order) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id, // Make sure this is included
      handler: function (response) {
        console.log("Full Razorpay response:", response);
        if (response.error) {
          toast.error(response.error.message);
          reject(response.error);
        } else {
          resolve(response);
        }
      },
      prefill: {
        name: "rijo",
        email: "rijo@gmail.com",
        contact: "",
      },
    };

    console.log("Razorpay options:", options);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  });
};
