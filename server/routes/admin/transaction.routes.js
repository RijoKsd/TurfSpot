import express from "express";         
import {getAllTransaction} from "../../controllers/admin/transaction.controller.js";
const transactionRouter = express.Router();

transactionRouter.get("/", getAllTransaction);

export default transactionRouter;