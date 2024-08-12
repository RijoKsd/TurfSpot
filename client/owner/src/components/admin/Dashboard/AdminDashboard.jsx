import useDashboardData from "@hooks/admin/useDashboardData";
import StatCard from "./StatCard";
import BookingHistoryChart from "./BookingHistoryChart";
import {
  Users,
  Building,
  MapPin,
  CreditCard,
  UserPlus,
  UserX,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useState } from "react";



const AdminDashboard = () => {
  const { data, loading, error } = useDashboardData();
    const [selectedTimeRange, setSelectedTimeRange] = useState("30");


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error)
    return <div className="text-center text-error p-4">Error: {error}</div>;

  const totalRevenue = data.bookingHistory.reduce(
    (sum, day) => sum + day.amount,
    0
  );

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="Total Users" value={data.totalUsers} icon={Users} />
          <StatCard
            title="Total Owners"
            value={data.totalOwners}
            icon={Building}
          />
          <StatCard title="Total Turfs" value={data.totalTurfs} icon={MapPin} />
          <StatCard
            title="Total Bookings"
            value={data.totalBookings}
            icon={CreditCard}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatCard
            title="Pending Requests"
            value={data.pendingRequests}
            icon={UserPlus}
            className="bg-warning text-warning-content"
          />
          <StatCard
            title="Rejected Requests"
            value={data.rejectedRequests}
            icon={UserX}
            className="bg-error text-error-content"
          />
          <StatCard
            title="Total Revenue"
            value={totalRevenue}
            icon={TrendingUp}
            prefix="₹"
            className="bg-success text-success-content"
          />
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Booking History</h2>
            <div className="flex justify-end mb-4">
              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
            <BookingHistoryChart
              data={data.bookingHistory.slice(-selectedTimeRange)}
            />
          </div>
        </div>


       
      </div>
    </div>
  );
};

export default AdminDashboard;