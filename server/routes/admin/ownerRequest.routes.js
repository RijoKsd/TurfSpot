import { Router } from "express";
import {
  getAllRequestedOwners,
  approveOwnerRequest,
} from "../../controllers/admin/ownerApproval.controller.js";


const ownerRequestRouter = Router();

ownerRequestRouter.get("/allRequestedOwners",getAllRequestedOwners);
ownerRequestRouter.post("/approveOwnerRequest/:id",approveOwnerRequest);

export default ownerRequestRouter;