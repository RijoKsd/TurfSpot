import { Router } from "express";
import {
  getAllRequestedOwners,
  approveOwnerRequest,
  deleteOwnerRequest,
  reconsiderOwnerRequest,
} from "../../controllers/admin/requestManagement.controller.js";


const ownerRequestRouter = Router();

ownerRequestRouter.get("/list",getAllRequestedOwners);
ownerRequestRouter.put("/:id/accept",approveOwnerRequest);
ownerRequestRouter.delete("/:id",deleteOwnerRequest);
ownerRequestRouter.put("/reconsider/:id",reconsiderOwnerRequest);

export default ownerRequestRouter;