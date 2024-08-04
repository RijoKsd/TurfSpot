import { useState } from "react";

const useDateSelection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    
  };

  return {
    selectedDate,
    handleDateChange,
  };
};

export default useDateSelection;
