import express from "express";
import {getAllUsers} from "../../controllers/admin/userManagement.controller.js"
import verifyAdminToken from "../../middleware/jwt/admin.middleware.js";

const userManagementRouter = express.Router();

userManagementRouter.get("/all", getAllUsers);

export default userManagementRouter;

