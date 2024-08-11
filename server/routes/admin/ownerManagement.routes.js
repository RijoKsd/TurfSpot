import { Router } from "express";
import {getAllOwners} from "../../controllers/admin/ownerManagement.controller.js";

const ownerManagementRouter = Router();

ownerManagementRouter.get("/list",getAllOwners);

export default ownerManagementRouter;