import {
  parseISO,
  addHours,
  addMinutes,
  setYear,
  setMonth,
  setDate,
  format,
} from "date-fns";

import chalk from "chalk";
import Turf from "../../models/turf.model.js";
import TimeSlot from "../../models/timeSlot.model.js";


function adjustTime(timeString, selectedTurfDate) {
  // Parse the original time
  const originalTime = parseISO(timeString);

  // Parse the selected turf date
  const turfDate = parseISO(selectedTurfDate);

  // Add 5 hours and 30 minutes
  let adjustedTime = addMinutes(addHours(originalTime, 5), 30);

  // Set the date components from the selectedTurfDate
  adjustedTime = setYear(adjustedTime, turfDate.getFullYear());
  adjustedTime = setMonth(adjustedTime, turfDate.getMonth());
  adjustedTime = setDate(adjustedTime, turfDate.getDate());

  return adjustedTime;
}

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
    ]);
    return res.status(200).json({ timeSlots, bookedTime });
  } catch (error) {
    console.log(chalk.red("Error in getTimeSlotByTurfId"), error);
    return res.status(500).json({ message: error.message });
  }
};

// INTERGRATING RAZOR PAY WHEN USER CLICK CONFIRM BUTTON AFTER CHOOSING THE TIME SLOT

export const turfBookingByRazorpay = async (req, res) => {
  // const { userId } = req.user;
  const { id, duration, startTime, endTime, selectedTurfDate } = req.body;
  console.log(startTime, "startTime");
  console.log(endTime, "endTime");
const adjustedStartTime = adjustTime(startTime, selectedTurfDate);
const adjustedEndTime = adjustTime(endTime, selectedTurfDate);

console.log("Selected Turf Date:", selectedTurfDate);
console.log(
  "Adjusted Start Time:",
 adjustedStartTime)
 
console.log(
  "Adjusted End Time:",
  adjustedEndTime)

  try {
    const newTimeSlot = await new TimeSlot({
      turf: id,
      startTime: adjustedStartTime,
      endTime:adjustedEndTime,
      isBooked: false,
    });

    await newTimeSlot.save();

    return res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
