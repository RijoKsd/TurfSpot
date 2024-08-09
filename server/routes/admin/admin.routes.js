import { Router } from "express"
import ownerRequestRouter from "./ownerManagement.routes.js"

const adminRouter = Router()

adminRouter.use("/ownerRequest",ownerRequestRouter);

export default adminRouter;

