import User from "../../models/user.model.js";

// get all users
export const getAllUsers = async (req, res) => {
  console.log("getAllUsers called");
  const admin = req.admin.role;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const users = await User.find({},{ password:0});
    res.status(200).json({ success: true, message: "success", users });
    
  } catch (error) {
    console.error("Error in getAllUsers: ", error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
};
