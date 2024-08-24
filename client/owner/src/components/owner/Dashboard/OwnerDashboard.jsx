import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CountUp from "react-countup";
import useOwnerDashboard from "@hooks/owner/useOwnerDashboard";
import DashboardSkeleton from "./DashboardSkeleton";

const OwnerDashboard = () => {
  const { dashboardData, loading, error } = useOwnerDashboard();

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  const {
    totalBookings,
    totalReviews,
    totalRevenue,
    totalTurfs,
    bookingsPerTurf,
    revenueOverTime,
  } = dashboardData;

  // Prepare data for Revenue Over Time chart
  const revenueChartData = revenueOverTime.map((item) => ({
    date: new Date(item._id).toLocaleDateString(),
    revenue: item.revenue,
  }));

  return (
    <div className="p-4 md:p-6 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
          Owner Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Bookings" value={totalBookings} icon="📅" />
          <StatCard title="Total Reviews" value={totalReviews} icon="⭐" />
          <StatCard
            title="Total Revenue"
            value={totalRevenue}
            icon="💰"
            prefix="₹"
          />
          <StatCard title="Total Turfs" value={totalTurfs} icon="🏟️" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartCard title="Bookings per Turf">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bookingsPerTurf}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Revenue Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, prefix = "" }) => (
  <div className="bg-base-100 p-4 rounded-lg shadow-lg">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-3xl font-bold mt-2">
      {prefix}
      <CountUp end={value || 0} duration={2.5} separator="," />
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-base-100 p-4 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default OwnerDashboard;
