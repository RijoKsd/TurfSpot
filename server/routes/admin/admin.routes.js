import { Router } from "express"
import ownerRequestRouter from "./ownerRequest.routes.js"

const adminRouter = Router()

adminRouter.use("/ownerRequest",ownerRequestRouter);

export default adminRouter;

