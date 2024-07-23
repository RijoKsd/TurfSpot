import { Router } from "express";
import userRouter from "./user/user.routes.js";
import ownerRouter from "./owner/owner.routes.js";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/owner", ownerRouter)

export default rootRouter;
