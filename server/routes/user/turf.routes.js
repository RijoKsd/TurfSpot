import { Router } from "express";
import {
  getAllTurfs,
  getTurfById,
  getTimeSlotByTurfId,
  turfBookingByRazorpay,
} from "../../controllers/user/turf.controller.js";

const turfRouter = Router();

// get all turfs
turfRouter.get("/all", getAllTurfs);
// get single turf by id
turfRouter.get("/details/:id", getTurfById);
// get time slots by turf id pass with query
turfRouter.get("/timeSlot", getTimeSlotByTurfId);
// update time slots by turf id pass with query

// INTERGRATING RAZOR PAY WHEN USER CLICK CONFIRM BUTTON AFTER CHOOSING THE TIME SLOT
turfRouter.post("/booking", turfBookingByRazorpay);

export default turfRouter;
