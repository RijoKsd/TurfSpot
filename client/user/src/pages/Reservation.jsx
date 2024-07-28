import React, { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationPage = ({ turfId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Reserve Turf</h2>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="w-full">
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
              <div className="badge badge-primary">
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
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Available start times
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`btn btn-sm ${
                    selectedTime === time ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => handleTimeSelection(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <button className="btn btn-primary w-full" disabled={!selectedTime}>
              Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
