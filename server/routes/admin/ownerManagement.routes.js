import { Router } from "express";
import {
  getAllRequestedOwners,
  approveOwnerRequest,
  deleteOwnerRequest,
} from "../../controllers/admin/ownerManagement.controller.js";


const ownerRequestRouter = Router();

ownerRequestRouter.get("/list",getAllRequestedOwners);
ownerRequestRouter.post("/:id/accept",approveOwnerRequest);
ownerRequestRouter.delete("/:id",deleteOwnerRequest);

export default ownerRequestRouter;