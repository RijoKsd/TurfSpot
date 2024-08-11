import Review from "../../models/review.model.js";
import Turf from "../../models/turf.model.js";


export const addReview = async (req, res) => {
   const userId = req.user.user;
  const { id } = req.params;
  const { rating, review:comment } = req.body;

  if (!rating || !comment) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }
  try {
    const turf = await Turf.findById(id);
    const review = new Review({
      user: userId,
      turf: id,
      rating,
      comment,
    });

    turf.reviews.push(review._id);
    
    await Promise.all([turf.save(), review.save()]);
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
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length; // average rating
     return res
       .status(200)
       .json({
         message: "Reviews retrieved successfully",
         reviews,
         averageRating,
       });
  } catch (error) {
    console.error("Error in viewReviewsByTurf", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
