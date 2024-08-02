
import chalk from "chalk";
import Turf from "../../models/turf.model.js";
import TimeSlot from "../../models/timeSlot.model.js";





// get all turfs
export const getAllTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({});
    return res.status(200).json({ turfs });
  } catch (err) {
    console.log(chalk.red("Error in getAllTurfs"), err);
    return res.status(500).json({ message: err.message });
  }
};

// get single turf by id

export const getTurfById = async (req, res) => {
  const { id } = req.params;
  try {
    const turf = await Turf.findById(id);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }
    return res.status(200).json({ turf });
  } catch (error) {
    console.log(chalk.red("Error in getTurfById"), error);
    return res.status(500).json({ message: error.message });
  }
};

// get time slots by turf id

export const getTimeSlotByTurfId = async (req, res) => {
  const { date, turfId } = req.query;
  try {
    // get all time slot when there is no turfid  in Timeslot db
    const bookedTime = await TimeSlot.find({
      turf: turfId,
      startTime: { $gte: new Date(date) },
    });
    const timeSlots = await Turf.findById(turfId).select([
      "openTime",
      "closeTime",
      "pricePerHour"
    ]);
    return res.status(200).json({ timeSlots, bookedTime });
  } catch (error) {
    console.log(chalk.red("Error in getTimeSlotByTurfId"), error);
    return res.status(500).json({ message: error.message });
  }
};






