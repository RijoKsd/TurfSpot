import { useEffect, useState } from "react";
import axiosInstance from "../useAxiosInstance";
import { useParams } from "react-router-dom";

const useTurfData = () => {
  const [turfData, setTurfData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { ownerId } = useParams();


  const fetchTurfData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/admin/owners/${ownerId}/turf`
      );
      const result = await response.data;
      setTurfData(result.turfs);
     } catch (err) {
      console.log(err);
    }finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfData();
  }, []);

  return { turfData, loading };
};

export default useTurfData;
