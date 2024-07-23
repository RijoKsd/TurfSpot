import { Router } from "express";
import { registerOwner, loginOwner } from "../../controllers/owner/auth.controller.js";

const authRouter = Router();
authRouter.post("/register", registerOwner);
authRouter.post("/login", loginOwner);

export default authRouter;



