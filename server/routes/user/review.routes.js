import express from "express";
import {
  addReview,
  viewReviewsByTurf,
} from "../../controllers/user/review.controller.js";
import verifyUserToken from "../../middleware/jwt/user.middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/:id", verifyUserToken, addReview);
reviewRouter.get("/:id", viewReviewsByTurf);

export default reviewRouter;
