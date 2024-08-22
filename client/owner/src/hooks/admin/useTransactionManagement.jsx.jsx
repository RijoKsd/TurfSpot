import { useState, useMemo, useEffect } from "react";

const useTransactionManagement = (initialTransactions) => {
  const [transactions, setTransactions] = useState([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState({
    search: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
     setTransactions(initialTransactions || []);
  }, [initialTransactions]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedTransactions = useMemo(() => {
 

    try {
      const filtered = transactions.filter((transaction) => {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          transaction.user.name.toLowerCase().includes(searchLower) ||
          transaction.turf.name.toLowerCase().includes(searchLower) ||
          transaction.payment.orderId.toLowerCase().includes(searchLower) ||
          transaction.payment.paymentId.toLowerCase().includes(searchLower);

        const withinPriceRange =
          (!filters.minAmount ||
            transaction.totalPrice >= Number(filters.minAmount)) &&
          (!filters.maxAmount ||
            transaction.totalPrice <= Number(filters.maxAmount));

        const withinDateRange =
          (!filters.startDate ||
            new Date(transaction.createdAt) >= new Date(filters.startDate)) &&
          (!filters.endDate ||
            new Date(transaction.createdAt) <= new Date(filters.endDate));

        return matchesSearch && withinPriceRange && withinDateRange;
      });

      const sorted = [...filtered].sort((a, b) => {
        if (sortField === "createdAt") {
          return sortDirection === "asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortField === "totalPrice") {
          return sortDirection === "asc"
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice;
        }
        return 0;
      });

       return sorted;
    } catch (error) {
      console.error("Error in filtering and sorting:", error);
      return [];
    }
  }, [transactions, filters, sortField, sortDirection]);

  return {
    filters,
    sortField,
    sortDirection,
    filteredAndSortedTransactions,
    handleFilterChange,
    toggleSort,
  };
};

export default useTransactionManagement;
