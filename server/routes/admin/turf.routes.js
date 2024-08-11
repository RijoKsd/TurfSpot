import { Router } from "express";
import {getTurfByOwnerId} from "../../controllers/admin/turf.controller.js";

const turfRouter = Router();

turfRouter.get("/:id/turf",getTurfByOwnerId);

export default turfRouter;