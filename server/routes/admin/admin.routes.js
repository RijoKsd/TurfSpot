import { Router } from "express"
import ownerRequestRouter from "./ownerManagement.routes.js"
import verifyAdminToken from "../../middleware/jwt/admin.middleware.js"
import userManagementRouter from "./userManagement.routes.js"

const adminRouter = Router()

adminRouter.use("/owner-requests", verifyAdminToken, ownerRequestRouter);
adminRouter.use("/users", verifyAdminToken, userManagementRouter);

export default adminRouter;

