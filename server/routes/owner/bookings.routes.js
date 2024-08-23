import express from "express";
import {getOwnerBookings} from "../../controllers/owner/booking.controller.js";
import verifyOwnerToken from "../../middleware/jwt/owner.middleware.js";

const bookingsRouter = express.Router();
bookingsRouter.get("/", verifyOwnerToken, getOwnerBookings);


export default bookingsRouter;