import { Router } from "express";
import authRouter from "./auth.routes.js"

const userRouter = Router();

userRouter.use("/auth", authRouter);

export default userRouter;