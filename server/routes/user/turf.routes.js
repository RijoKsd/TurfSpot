import { Router } from "express";
import {
  getAllTurfs,
  getTurfById,
  getTimeSlotByTurfId,
} from "../../controllers/user/turf.controller.js";

const turfRouter = Router();

// get all turfs
turfRouter.get("/all", getAllTurfs);
// get single turf by id
turfRouter.get("/details/:id", getTurfById);
// get time slots by turf id pass with query
turfRouter.get("/timeSlots", getTimeSlotByTurfId);

export default turfRouter;
