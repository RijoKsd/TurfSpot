import Booking from "../../models/booking.model.js";
import Turf from "../../models/turf.model.js";

export const getOwnerBookings = async (req, res) => {
  try {
    const ownerId = req.owner.id;

    // Find turfs owned by this owner
    const ownedTurfs = await Turf.find({ owner: ownerId }).select("_id");
    console.log(ownedTurfs.length, "ownedTurfs");

    if (ownedTurfs.length === 0) {
      console.log("No bookings found for this owner's turfs");
      return res.status(404).json({ message: "No turfs found for this owner" });
    }

    const turfIds = ownedTurfs.map((turf) => turf._id);

    const bookings = await Booking.aggregate([
      {
        $match: {
          turf: { $in: turfIds },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "turves",
          localField: "turf",
          foreignField: "_id",
          as: "turf",
        },
      },
      {
        $lookup: {
          from: "timeslots",
          localField: "timeSlot",
          foreignField: "_id",
          as: "timeSlot",
        },
      },
      { $unwind: "$user" },
      { $unwind: "$turf" },
      { $unwind: "$timeSlot" },
      {
        $project: {
          id: "$_id",
          turfName: "$turf.name",
          userName: "$user.name",
          totalPrice: 1,
          bookingDate: "$createdAt",
          duration: {
            $divide: [
              { $subtract: ["$timeSlot.endTime", "$timeSlot.startTime"] },
              1000 * 60 * 60, // Convert milliseconds to hours
            ],
          },
          startTime: "$timeSlot.startTime",
          endTime: "$timeSlot.endTime",
        },
      },
      { $sort: { bookingDate: -1 } },
    ]);

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this owner's turfs" });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in getOwnerBookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};
