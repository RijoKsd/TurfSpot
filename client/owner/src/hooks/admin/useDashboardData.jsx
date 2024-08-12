import { useEffect, useState } from "react";
import axiosInstance from "../useAxiosInstance"

 const useDashboardData = () => {
   const [data, setData] = useState({
     totalUsers: 0,
     totalOwners: 0,
     totalTurfs: 0,
     totalTransactions: 0,
     pendingRequests: 0,
     rejectedRequests: 0,
     transactionHistory: [],
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);


    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/dashboard");
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "An error occurred while fetching data"
        );
      } finally {
        setLoading(false);
      }
    };
   useEffect(() => {
     fetchData();
   }, []);

   return { data, loading, error };
 };

export default  useDashboardData;