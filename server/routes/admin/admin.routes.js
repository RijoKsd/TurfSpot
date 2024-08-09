import { Router } from "express"
import ownerRequestRouter from "./ownerManagement.routes.js"

const adminRouter = Router()

adminRouter.use("/owner-requests",ownerRequestRouter);

export default adminRouter;

