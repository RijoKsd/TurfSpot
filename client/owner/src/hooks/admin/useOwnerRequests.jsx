import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";
import toast from "react-hot-toast";

const useOwnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/admin/owner-requests/list"
      );
      const data = await response.data;
      setRequests(data.ownerRequests);
    } catch (err) {
      console.log(err, "err");
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    setRequestId(id);
    try {
      // Replace with your actual API endpoint
      const response = await axiosInstance.put(
        `/api/admin/owner-requests/${id}/accept`
      );
      const result = await response.data;
      console.log(result, "result");
      toast.success(result.message);
      setRequests(requests.filter((request) => request._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    } finally {
      setRequestId("");
    }
  };

  const handleDelete = async (id) => {
    setRequestId(id);
    try {
      const response = await axiosInstance.delete(`/api/admin/owner-requests/${id}`);
      const result = await response.data;
       toast.success(result.message);
       setRequests(requests.filter((request) => request._id !== id));
    } catch (err) {
      console.error(err, "delete error");
      toast.error(err.response?.data?.message);
    } finally {
      setRequestId("");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    handleAccept,
    handleDelete,
     requestId,
  };
};

export default useOwnerRequests;
