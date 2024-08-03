import adjustTime from "../../utils/adjustTime.js";
import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Booking from "../../models/booking.model.js"
import TimeSlot from "../../models/timeSlot.model.js"
import generateQRCode from "../../utils/generateQRCode.js";
import Turf from "../../models/turf.model.js";
import  generateEmail  from "../../utils/generateEmail.js"
import User from "../../models/user.model.js"


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
  console.log(req.user, "req.user")
  const  userId  = req.user.user;
  console.log(userId, "userId")

  const {
    id : turfId,
    duration,
    startTime,
    endTime,
    selectedTurfDate,
    totalPrice,
    paymentId,
    orderId,
    razorpay_signature,
  } = req.body;
 
 
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
  console.log("payment verification passed");
 
  const adjustedStartTime = adjustTime(startTime, selectedTurfDate);
  const adjustedEndTime = adjustTime(endTime, selectedTurfDate);

  try {
    // getting turf details for adding to QR code when booking is successful
    const turf = await Turf.findById(turfId);
     const QRcode = await  generateQRCode(totalPrice, startTime, endTime, selectedTurfDate, turf.name, turf.location);
console.log(QRcode)

    //  first add time slot to db
    const newTimeSlot =   new TimeSlot({
      turf: turfId,
      startTime: adjustedStartTime,
      endTime:adjustedEndTime,
    });

    const timeSlot = await newTimeSlot.save();

 // then add booking to db using the time slot id
    const booking =  new Booking({
      user: userId,
      turf:turfId,
      timeSlot:timeSlot._id,
      totalPrice,
      qrCode:QRcode,
      payment:{
        orderId,
        paymentId,
      },
    })

    await booking.save();

    //  add turf name, location startTime, endTime date, totalprice and qrcode
    const htmlContent = `
      <h1>Booking Confirmation</h1>
      <p>Your booking has been successful.</p>
      <p>Turf Name: ${turf.name}</p>
      <p>Location: ${turf.location}</p>
      <p>Start Time: ${adjustedStartTime}</p>
      <p>End Time: ${adjustedEndTime}</p>
      <p>Total Price: ${totalPrice}</p>
      <img src=" ${QRcode}" alt="QRcode" />
       <p>Thank you for using our service.</p>
      <p>Best Regards,</p>
      <p>The Team</p>
      <p>Booking Confirmation</p>
    `;

    const user = await User.findById(userId);
    console.log(user, "user")
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }

    // send email to user
    const email = await generateEmail(user.email, "Booking Confirmation", htmlContent)
    return res.status(200).json({ message: "Booking successful, Check your email for the receipt" });
  } catch (error) {
    console.log(error);
  }
};
