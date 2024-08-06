import { Router } from "express";
import {
  verifyPayment,
  createOrder,
  getBookings,
} from "../../controllers/user/booking.controller.js";
import verifyUserToken from "../../middleware/jwt/user.middleware.js";

const bookingRouter = Router();

bookingRouter.post("/create-order", verifyUserToken, createOrder);
bookingRouter.post("/verify-payment", verifyUserToken, verifyPayment);
bookingRouter.get("/get-bookings", verifyUserToken, getBookings);

export default bookingRouter;
