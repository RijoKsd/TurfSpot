import { Router } from "express";
import { getAllTurfs } from "../../controllers/admin/turf.controller.js";
import verifyAdminToken from "../../middleware/jwt/admin.middleware.js";

const turfRouter = Router();

turfRouter.get("/all", verifyAdminToken,getAllTurfs);

export default turfRouter;