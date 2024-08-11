import { Router } from "express"
import ownerRequestRouter from "./requestManagement.routes.js"
import verifyAdminToken from "../../middleware/jwt/admin.middleware.js"
import userManagementRouter from "./userManagement.routes.js"
import ownerManagementRouter from "./ownerManagement.routes.js"
import turfRouter from "./turf.routes.js"

const adminRouter = Router()

adminRouter.use("/owner-requests", verifyAdminToken, ownerRequestRouter);
adminRouter.use("/users", verifyAdminToken, userManagementRouter);
adminRouter.use("/owners", verifyAdminToken, ownerManagementRouter);
adminRouter.use("/turfs", verifyAdminToken, turfRouter);

export default adminRouter;

