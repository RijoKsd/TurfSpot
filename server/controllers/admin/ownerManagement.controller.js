import Turf from "../../models/turf.model.js";
import Owner from "../../models/owner.model.js";
import Review from "../../models/review.model.js";

//  get all owners

export const getAllOwners = async (req, res) => {
  const admin = req.admin.role;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const owners = await Owner.find({ role: "owner" }, { password: 0 });
    res.status(200).json({
      message: " Fetched all owners",
      owners,
    });
  } catch (error) {
    console.error("Error in getAllOwners: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get turf by owner id

export const getTurfByOwnerId = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const turfs = await Turf.find({ owner: id }).lean();
    const turfsWithAvgRating = await Promise.all(
      turfs.map(async (turf) => {
        const reviews = await Review.find({ turf: turf._id });
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        return {
          ...turf,
          avgRating: Number(avgRating.toFixed(1)),
        };
      })
    );

    console.log(turfsWithAvgRating, "turfsWithAvgRating");

    return res.status(200).json({
      message: " Fetched turf",
      turfs: turfsWithAvgRating,
    });
  } catch (error) {
    console.error("Error in getTurfByOwnerId: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
