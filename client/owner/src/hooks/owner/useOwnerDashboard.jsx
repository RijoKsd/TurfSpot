import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";

const useOwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalReviews: 0,
    totalRevenue: 0,
    totalTurfs: 0,
    bookingsPerTurf: [],
    revenueOverTime: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/owner/dashboard");
         setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error };
};

export default useOwnerDashboard;
