import React from "react";

const BookingsSkeleton = () => {
  return (
    <div className="p-4">
      <div className="h-8 bg-base-300 rounded w-1/4 mb-4"></div>
      <div className="h-10 bg-base-300 rounded w-1/3 mb-4"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {["Turf", "User", "Price", "Date", "Duration"].map((header) => (
                <th key={header} className="bg-base-300 h-8"></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                {[1, 2, 3, 4, 5].map((j) => (
                  <td key={j} className="bg-base-300 h-6"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsSkeleton;
