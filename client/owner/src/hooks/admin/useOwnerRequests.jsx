import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";

const useOwnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(requests, "requests")
 
  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axiosInstance.get("/api/admin/owner-requests/list");
      
       const data = await  response.data;
        setRequests(data.ownerRequests);
     } catch (err) {
      console.log(err, "err")
     } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/owner-requests/${id}/accept`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to accept request");
      setRequests(requests.filter((request) => request.id !== id));
    } catch (err) {
     }
  };

  const handleDelete = async (id) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/owner-requests/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete request");
      setRequests(requests.filter((request) => request.id !== id));
    } catch (err) {
     }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests, loading,  handleAccept, handleDelete }
};

export default useOwnerRequests;
