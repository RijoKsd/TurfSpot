import {
  parseISO,
  addHours,
  addMinutes,
  setYear,
  setMonth,
  setDate,
} from "date-fns";

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

export default adjustTime;
