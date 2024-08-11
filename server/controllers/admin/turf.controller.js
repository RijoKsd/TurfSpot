import Turf from "../../models/turf.model.js";
import Owner from "../../models/owner.model.js";

//  get all turfs

export const getAllTurfs = async (req,res)=>{
     const admin = req.admin.role;
    if (admin !== "admin") {
        return res
            .status(403)
            .json({ success: false, message: "Unauthorized access denied" });
    }
    try {
        const turfs = await Turf.find({}, { password: 0 });
        res.status(200).json({
            message: " Fetched all turfs",
            turfs,
        });
    } catch (error) {
        console.error("Error in getAllTurfs: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
 
 