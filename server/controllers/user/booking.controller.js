import adjustTime from "../../utils/adjustTime.js";
import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Booking from "../../models/booking.model.js"
import TimeSlot from "../../models/timeSlot.model.js"
import generateQRCode from "../../utils/generateQRCode.js";
import Turf from "../../models/turf.model.js";
import  generateEmail, { generateHTMLContent }  from "../../utils/generateEmail.js"
import User from "../../models/user.model.js"
import { format, parseISO } from "date-fns";


export const createOrder = async (req, res) => {
    const userId = req.user.user;
    try{
        const { totalPrice } = req.body;
        // select only name and contact and email
        const user = await User.findById(userId).select("name  email");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const options = {
            amount: totalPrice * 100,
            currency: "INR",
            receipt: `receipt${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        return res.status(200).json({ order, user });
    }
    catch(error){
        return res.status(400).json({ message: error.message });
    }
 
 
};

export const verifyPayment = async (req, res) => {
  const  userId  = req.user.user;

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
 
  
  const formattedStartTime = format(parseISO(startTime), "hh:mm a");
  const formattedEndTime = format(parseISO(endTime), "hh:mm a");
  const formattedDate = format(parseISO(selectedTurfDate), "d MMM yyyy");

 
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
 
  // This time is for the time slot that is created in the database
  const adjustedStartTime = adjustTime(startTime, selectedTurfDate);
  const adjustedEndTime = adjustTime(endTime, selectedTurfDate);

  try {

     const user = await User.findById(userId);
     if (!user) {
      return res.status(400).json({ message: "User not found" });
     
     }
    // getting turf details for adding to QR code when booking is successful
    const turf = await Turf.findById(turfId);
     const QRcode = await  generateQRCode(totalPrice, formattedStartTime, formattedEndTime, formattedDate, turf.name, turf.location);
 

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

    //  add turf name, location startTime, endTime date, totalPrice and QrCode
 
const htmlContent = generateHTMLContent(turf.name, turf.location,formattedDate,formattedStartTime,formattedEndTime,totalPrice, QRcode)

   

    // send email to user
    const email = await generateEmail(user.email, "Booking Confirmation", htmlContent)
    return res.status(200).json({ message: "Booking successful, Check your email for the receipt" });
  } catch (error) {
    console.log(error);
  }
};
