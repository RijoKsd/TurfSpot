import { format } from "date-fns";
import { getEndTime } from "../../utils/dateUtils";

const ReservationSummary = ({
  selectedDate,
  selectedStartTime,
  duration,
  pricePerHour,
}) => {
 
  return (
    <div className="mt-6 p-4 bg-base-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Your Reservation</h3>
      <p>Date: {format(selectedDate, "dd-MM-yyyy")}</p>
      <p>
        Time: {selectedStartTime} to {getEndTime(selectedStartTime, duration)}
      </p>
      <p>
        Duration: {duration} hour{duration > 1 ? "s" : ""}
      </p>
      <p className="font-bold">Price: {pricePerHour * duration} INR</p>
    </div>
  );
};

export default ReservationSummary;
