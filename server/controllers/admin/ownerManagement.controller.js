import Turf from "../../models/turf.model.js";
import Owner from "../../models/owner.model.js";

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
    const turf = await Turf.find({ owner: id });
    console.log(turf, "turf");
    return res.status(200).json({
      message: " Fetched turf",
      turf,
    });
  } catch (error) {
    console.error("Error in getTurfByOwnerId: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
