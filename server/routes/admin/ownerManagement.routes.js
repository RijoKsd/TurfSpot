import { Router } from "express";
import {
  getAllOwners,
  getTurfByOwnerId,
} from "../../controllers/admin/ownerManagement.controller.js";

const ownerManagementRouter = Router();

ownerManagementRouter.get("/list",getAllOwners);
ownerManagementRouter.get("/:id/turf",getTurfByOwnerId);

export default ownerManagementRouter;