import { Router } from "express";
import authRouter from "./auth.routes.js"
import turfRouter from "./turf.routes.js"


const userRouter = Router();

userRouter.use("/auth", authRouter);
userRouter.use("/turf", turfRouter);

export default userRouter;