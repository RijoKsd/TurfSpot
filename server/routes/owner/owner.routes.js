import { Router } from "express"
import authRouter from "./auth.routes.js"
import turfRouter from "./turf.routes.js"

const ownerRouter = Router()


ownerRouter.use("/auth",authRouter);
ownerRouter.use("/turf",turfRouter);

export default ownerRouter;