import Review from "../../models/review.model.js";
import User from "../../models/user.model.js";
import Turf from "../../models/turf.model.js";

export const addReview = async (req, res) => {
  const userId = req.user.user;
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }
  try {
    const review = new Review({
      user: userId,
      turf: id,
      rating,
      comment,
    });
    await review.save();
    return res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error in addReview", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewReviewsByTurf = async (req, res) => {
  const { id } = req.params; // turf id
  try {
    const reviews = await Review.find({ turf: id }).sort({ createdAt: -1 }).populate("user", "name")
    return res
      .status(200)
      .json({ message: "Reviews retrieved successfully", reviews });
  } catch (error) {
    console.error("Error in viewReviewsByTurf", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
