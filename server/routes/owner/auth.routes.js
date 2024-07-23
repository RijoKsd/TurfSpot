import { Router } from "express";
import { registerOwner, loginOwner } from "../../controllers/owner/auth.controller.js";
import { validateRegisterInput, validateLoginInput } from "../../middleware/validators/owner/authValidator.js";

const authRouter = Router();
authRouter.post("/register",validateRegisterInput, registerOwner);
authRouter.post("/login",validateLoginInput, loginOwner);

export default authRouter;



