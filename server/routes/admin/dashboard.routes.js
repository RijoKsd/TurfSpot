import express from "express";
import  getDashboard  from "../../controllers/admin/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", getDashboard);

export default dashboardRouter;
