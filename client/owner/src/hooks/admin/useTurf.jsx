import { useEffect, useState } from "react";
import axiosInstance from "../useAxiosInstance";
 
const useTurfData = () => {
  const [turfData, setTurfData] = useState(null);
  const [loading, setLoading] = useState(true);


 
  const fetchTurfData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/admin/turfs/all`
      );
      const result = await response.data;
       setTurfData(result.turfs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfData();
  }, []);

  return { turfData, loading };
};

export default useTurfData;
