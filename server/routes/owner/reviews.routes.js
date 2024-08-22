import {Router} from "express";
import verifyOwnerToken from "../../middleware/jwt/owner.middleware.js";

import { getTurfsWithReviews } from "../../controllers/owner/review.controller.js";
const reviewsRouter = Router();

reviewsRouter.get("/turfs-with-reviews", verifyOwnerToken, getTurfsWithReviews);

export default reviewsRouter;