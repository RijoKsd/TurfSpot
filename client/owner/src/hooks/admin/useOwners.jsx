// useOwners.jsx
import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";

const useOwners = () => {
  const [owners, setOwners] = useState({
    all: [],
    filtered: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setOwners((prev) => {
        console.log(prev, "prev");
        return {
          ...prev,
          filtered: prev.all,
        };
      });
    } else {
      const filtered = owners.all.filter(
        (owner) =>
          owner.name.toLowerCase().includes(value.toLowerCase()) ||
          owner.email.toLowerCase().includes(value.toLowerCase())
      );
      setOwners((prev) => ({
        ...prev,
        filtered: filtered,
      }));
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/owners/list");
      const result = response.data.owners;
      setOwners({
        all: result,
        filtered: result,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching owners:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return { owners: owners.filtered, loading, searchTerm, handleSearch };
};

export default useOwners;
