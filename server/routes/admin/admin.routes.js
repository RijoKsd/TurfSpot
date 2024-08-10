import { Router } from "express"
import ownerRequestRouter from "./ownerManagement.routes.js"
import verifyAdminToken from "../../middleware/jwt/admin.middleware.js"

const adminRouter = Router()

adminRouter.use("/owner-requests", verifyAdminToken, ownerRequestRouter);

export default adminRouter;

