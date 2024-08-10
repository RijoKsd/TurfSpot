import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../useAxiosInstance";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      // Replace this with your actual API call
      const response = await axiosInstance.get("/api/admin/users/all");
      const result = await response.data;
      setUsers(result.users);
      setFilteredUsers(result.users);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    },
    [users]
  );

  return { users: filteredUsers, loading, searchTerm, handleSearch };
};

export default useUsers;
