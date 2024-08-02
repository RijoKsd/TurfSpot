import adjustTime from "../../utils/adjustTime.js";
import razorpay from "../../config/razorpay.js";
import crypto from "crypto";


export const createOrder = async (req, res) => {
  const { totalPrice } = req.body;

  const options = {
    amount: totalPrice * 100,
    currency: "INR",
    receipt: `receipt${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { userId } = req.user;

  const {
    id,
    duration,
    startTime,
    endTime,
    selectedTurfDate,
    totalPrice,
    paymentId,
    orderId,
    razorpay_signature,
  } = req.body;
  console.log(req.body, "req.body");

/* This code snippet is performing payment verification using a Hash-based Message Authentication Code
(HMAC) algorithm with SHA-256 hashing. Here's a breakdown of what each step is doing: */
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  
  hmac.update(`${orderId}|${paymentId}`)
  const generatedSignature = hmac.digest('hex');
  console.log(generatedSignature, "generatedSignature");
  if (generatedSignature !== razorpay_signature) {
    console.log("Payment Verification Failed");
    return res
      .status(400)
      .json({ success: false, message: "Payment Verification Failed" });
  }
 
  const adjustedStartTime = adjustTime(startTime, selectedTurfDate);
  const adjustedEndTime = adjustTime(endTime, selectedTurfDate);

  try {
  } catch (error) {
    console.log(error);
  }
  //   try {
  //     const newTimeSlot = await new TimeSlot({
  //       turf: id,
  //       startTime: adjustedStartTime,
  //       endTime:adjustedEndTime,
  //       isBooked: false,
  //     });

  //     await newTimeSlot.save();

  //     return res.status(200).json({ message: "Booking successful" });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
};
