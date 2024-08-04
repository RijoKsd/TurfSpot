import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, isSameDay } from "date-fns";

const DateSelection = ({ selectedDate, handleDateChange }) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="w-full">
        <label className="label">
          <span className="label-text">Select Date</span>
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          minDate={new Date()}
          className="input input-bordered w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          className="btn btn-outline btn-sm w-full sm:w-auto"
          onClick={() => handleDateChange(addDays(selectedDate, -1))}
          disabled={isSameDay(selectedDate, new Date())}
        >
          PREV DATE
        </button>
        <div className="badge badge-primary text-lg p-4">
          {format(selectedDate, "dd-MM-yyyy")}
        </div>
        <button
          className="btn btn-outline btn-sm w-full sm:w-auto"
          onClick={() => handleDateChange(addDays(selectedDate, 1))}
        >
          NEXT DATE
        </button>
      </div>
    </div>
  );
};

export default DateSelection;
