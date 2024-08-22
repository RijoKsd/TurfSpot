import User from "../../models/user.model.js";
import Turf from "../../models/turf.model.js";
import Booking from "../../models/booking.model.js";
import OwnerRequest from "../../models/ownerRequest.model.js";
import Owner from "../../models/owner.model.js";

const getDashboard = async (req, res) => {
   try {
    // Get only the count

    const totalUsers = await User.countDocuments();
    const totalOwners = await Owner.countDocuments({ role: "owner" });
    const totalTurfs = await Turf.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingRequests = await OwnerRequest.countDocuments({
      status: "pending",
    });
    const rejectedRequests = await OwnerRequest.countDocuments({
      status: "rejected",
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const bookingHistory = await Booking.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: "$_id",
          amount: 1,
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({
      totalUsers,
      totalOwners,
      totalTurfs,
      totalBookings,
      pendingRequests,
      rejectedRequests,
      bookingHistory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error getting dashboard" });
  }
};

export default getDashboard;
