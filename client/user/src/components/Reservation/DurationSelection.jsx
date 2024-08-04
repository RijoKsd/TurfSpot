import { getEndTime } from "../../utils/dateUtils";

const DurationSelection = ({
  selectedStartTime,
  duration,
  handleDurationChange,
  isDurationAvailable,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {[1, 2, 3].map((hours) => (
          <button
            key={hours}
            className={`btn flex-1 ${
              duration === hours ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleDurationChange(hours)}
            disabled={!isDurationAvailable(selectedStartTime, hours)}
          >
            <div>
              <div>
                {hours} hour{hours > 1 ? "s" : ""}
              </div>
              <div className="text-sm">
                {selectedStartTime} to {getEndTime(selectedStartTime, hours)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelection;
