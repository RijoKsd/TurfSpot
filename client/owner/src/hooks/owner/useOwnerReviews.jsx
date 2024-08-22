import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";

const useOwnerReviews = () => {
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/owner/reviews/turfs-with-reviews");
      setTurfs(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch turfs and reviews");
      setLoading(false);
    }
  };

  return { turfs, selectedTurf, setSelectedTurf, loading, error };
};

export default useOwnerReviews;
