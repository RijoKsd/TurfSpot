import { Router } from "express"
import authRouter from "./auth.routes.js"
import turfRouter from "./turf.routes.js"
import reviewsRouter from "./reviews.routes.js"

const ownerRouter = Router()


ownerRouter.use("/auth",authRouter);
ownerRouter.use("/turf",turfRouter);
ownerRouter.use("/reviews",reviewsRouter);

export default ownerRouter;