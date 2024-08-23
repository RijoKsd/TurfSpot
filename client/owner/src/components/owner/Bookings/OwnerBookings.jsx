import useOwnerBookings from "@hooks/owner/useOwnerBookings";
import BookingsSkeleton from "./BookingsSkeleton";
import { format, subHours, subMinutes } from "date-fns";
import { ArrowUpDown, Calendar, Clock, User, IndianRupee } from "lucide-react";
import Avatar from "react-avatar";

const OwnerBookings = () => {
  const {
    bookings,
    loading,
    error,
    filterDays,
    setFilterDays,
    sortConfig,
    requestSort,
  } = useOwnerBookings();

  if (loading) return <BookingsSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  const getSortDirection = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const formatTime = (dateString) => {
    // Subtract 5 hours and 30 minutes from the time
    const adjustedDate = subMinutes(subHours(new Date(dateString), 5), 30);
    return format(adjustedDate, "h:mm aa");
  };

  return (
    <div className="p-4 md:p-6 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary">
          Bookings Overview
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <select
            className="select select-primary w-full md:w-auto max-w-xs"
            value={filterDays}
            onChange={(e) => setFilterDays(Number(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={15}>Last 15 days</option>
            <option value={30}>Last 30 days</option>
          </select>

          <div className="stats shadow w-full md:w-auto">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Bookings</div>
              <div className="stat-value">{bookings.length}</div>
              <div className="stat-desc">From last {filterDays} days</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Turf</th>
                <th>User</th>
                <th
                  onClick={() => requestSort("startTime")}
                  className="cursor-pointer"
                >
                  Start Time{" "}
                  {getSortDirection("startTime") && (
                    <ArrowUpDown size={16} className="inline" />
                  )}
                </th>
                <th
                  onClick={() => requestSort("endTime")}
                  className="cursor-pointer"
                >
                  End Time{" "}
                  {getSortDirection("endTime") && (
                    <ArrowUpDown size={16} className="inline" />
                  )}
                </th>
                <th
                  onClick={() => requestSort("bookingDate")}
                  className="cursor-pointer"
                >
                  Date{" "}
                  {getSortDirection("bookingDate") && (
                    <ArrowUpDown className="inline" size={16} />
                  )}
                </th>
                <th>Duration</th>
                <th
                  onClick={() => requestSort("totalPrice")}
                  className="cursor-pointer"
                >
                  Price{" "}
                  {getSortDirection("totalPrice") && (
                    <ArrowUpDown size={16} className="inline" />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover">
                  <td className="whitespace-nowrap">{booking.turfName}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <Avatar name={booking.userName} size="32" round={true} />
                      <div className="hidden md:block font-bold">
                        {booking.userName}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <Clock size={16} className="inline mr-1" />
                    {formatTime(booking.startTime)}
                  </td>
                  <td className="whitespace-nowrap">
                    <Clock size={16} className="inline mr-1" />
                    {formatTime(booking.endTime)}
                  </td>
                  <td className="whitespace-nowrap">
                    <Calendar size={16} className="inline mr-1" />
                    {format(new Date(booking.bookingDate), "dd MMM yyyy")}
                  </td>
                  <td>{booking.duration.toFixed(2)} hrs</td>
                  <td>
                    <span className="badge badge-accent badge-lg">
                      <IndianRupee size={16} className="inline mr-1" />
                      {booking.totalPrice}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 md:mt-6 text-sm text-base-content opacity-70">
          Showing {bookings.length} bookings from the last {filterDays} days
        </div>
      </div>
    </div>
  );
};

export default OwnerBookings;
