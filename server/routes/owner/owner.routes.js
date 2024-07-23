import { Router } from "express"
import authRouter from "./auth.routes.js"

const ownerRouter = Router()


ownerRouter.use("/auth",authRouter);

export default ownerRouter;