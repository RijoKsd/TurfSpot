const useDateSelection = (
  setSelectedDate,
  setSelectedStartTime,
  setDuration
) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedStartTime(null);
    setDuration(1);
  };

  return {
    handleDateChange,
  };
};

export default useDateSelection;
