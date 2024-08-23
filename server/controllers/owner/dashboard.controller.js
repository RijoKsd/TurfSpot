import Booking from "../../models/booking.model.js";
import Review from "../../models/review.model.js";
import Turf from "../../models/turf.model.js";
import User from "../../models/user.model.js";
 

export const getDashboardData = async (req, res) => {
  try {
    const ownerId =  req.owner.id;

    // Step 1: Find all turfs owned by this owner
    const turfs = await Turf.find({ owner: ownerId }).select("_id name");
    const turfIds = turfs.map((turf) => turf._id);

    const [
      totalBookings,
      totalReviews,
      totalRevenue,
      bookingsPerTurf,
      revenueOverTime,
    ] = await Promise.all([
      Booking.countDocuments({ turf: { $in: turfIds } }),
      Review.countDocuments({ turf: { $in: turfIds } }),
      Booking.aggregate([
        { $match: { turf: { $in: turfIds } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Booking.aggregate([
        { $match: { turf: { $in: turfIds } } },
        { $group: { _id: "$turf", count: { $sum: 1 } } },
        {
          $lookup: {
            from: "turves",
            localField: "_id",
            foreignField: "_id",
            as: "turfInfo",
          },
        },
        { $unwind: "$turfInfo" },
        { $project: { name: "$turfInfo.name", bookings: "$count" } },
      ]),
      Booking.aggregate([
        { $match: { turf: { $in: turfIds } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            revenue: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 30 },
      ]),
    ]);

   const  rijobookingsPerTurf =  await Booking.aggregate([
      { $match: { turf: { $in: turfIds } } },
      { $group: { _id: "$turf", bookings: { $sum: 1 } } },
      {
        $lookup: {
          from: "turfs",
          localField: "_id",
          foreignField: "_id",
          as: "turfInfo",
        },
      },
      { $unwind: "$turfInfo" },
      { $project: { name: "$turfInfo.name", bookings: 1 } },
    ]);
      console.log(rijobookingsPerTurf, "rijobookingsPerTurf");
    res.json({
      totalBookings,
      totalReviews,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalTurfs: turfs.length,
      bookingsPerTurf,
      revenueOverTime,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: error.message });
  }
};