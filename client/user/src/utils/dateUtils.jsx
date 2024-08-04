import { parse, addHours, format, isEqual } from "date-fns";

export const getEndTime = (startTime, hours) => {
  if (!startTime) return "";
  const start = parse(startTime, "hh:mm a", new Date());
  const end = addHours(start, hours);
  return format(end, "hh:mm a");
};

export const isSameTime = (time1, time2) => {
  return isEqual(
    parse(time1, "hh:mm a", new Date()),
    parse(time2, "hh:mm a", new Date())
  );
};

export const parseTime = (time) => parse(time, "hh:mm a", new Date());

export const formatTime = (date) => format(date, "hh:mm a");
