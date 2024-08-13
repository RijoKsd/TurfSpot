 
import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import Avatar from "react-avatar";
import useTransactionData from "@hooks/admin/useTransactionData";
import TransactionSkeleton from "./TransactionSkeleton";

const TransactionSection = () => {
  const { transactions, loading, error } = useTransactionData();
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState({
    search: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  if (loading) return <TransactionSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      const searchLower = filters.search.toLowerCase();
      return (
        (transaction.user.name.toLowerCase().includes(searchLower) ||
          transaction.turf.name.toLowerCase().includes(searchLower) ||
          transaction.payment.orderId.toLowerCase().includes(searchLower) ||
          transaction.payment.paymentId.toLowerCase().includes(searchLower)) &&
        (!filters.minAmount ||
          transaction.totalPrice >= Number(filters.minAmount)) &&
        (!filters.maxAmount ||
          transaction.totalPrice <= Number(filters.maxAmount)) &&
        (!filters.startDate ||
          new Date(transaction.createdAt) >= new Date(filters.startDate)) &&
        (!filters.endDate ||
          new Date(transaction.createdAt) <= new Date(filters.endDate))
      );
    })
    .sort((a, b) => {
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

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-base-200">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            placeholder="Min Amount"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleFilterChange}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            placeholder="Max Amount"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleFilterChange}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>
                <button
                  className="flex items-center"
                  onClick={() => toggleSort("createdAt")}
                >
                  Date
                  {sortField === "createdAt" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </button>
              </th>
              <th>Turf</th>
              <th>Order ID</th>
              <th>Payment ID</th>
              <th>
                <button
                  className="flex items-center"
                  onClick={() => toggleSort("totalPrice")}
                >
                  Amount
                  {sortField === "totalPrice" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="flex items-center space-x-3">
                  <Avatar name={transaction.user.name} size="40" round={true} />
                  <span>{transaction.user.name}</span>
                </td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td>{transaction.turf.name}</td>
                <td>{transaction.payment.orderId}</td>
                <td>{transaction.payment.paymentId}</td>
                <td>₹{transaction.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TransactionSection;