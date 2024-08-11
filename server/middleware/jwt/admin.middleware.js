import jwt from "jsonwebtoken";

const verifyAdminToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Invalid authorization" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token , authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid token , authorization denied",
      });
    }
    req.admin = decoded;
    if (req.admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default verifyAdminToken;
