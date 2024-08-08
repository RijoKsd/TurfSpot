import { useSelector, useDispatch } from "react-redux";
import { setTurfs, setLoading, setError } from "../redux/slices/turfSlice";
import axiosInstance from "../hooks/useAxiosInstance";
import { useEffect } from "react";

const useTurfData = () => {
  const dispatch = useDispatch();
  const { turfs, loading } = useSelector((state) => state.turf);

  useEffect(() => {
    const fetchTurfData = async () => {
      try {
        dispatch(setLoading(true));
        // Fetch your turf data here
        const response = await axiosInstance.get("/api/user/turf/all");
        const data = await response.data.turfs;
        dispatch(setTurfs(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchTurfData();
  }, []);

  return { turfs, loading };
};

export default useTurfData;
