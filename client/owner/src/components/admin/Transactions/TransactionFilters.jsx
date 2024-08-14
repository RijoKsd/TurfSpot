import React from "react";

const TransactionFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        name="search"
        value={filters.search}
        onChange={onFilterChange}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="number"
        placeholder="Min Amount"
        name="minAmount"
        value={filters.minAmount}
        onChange={onFilterChange}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="number"
        placeholder="Max Amount"
        name="maxAmount"
        value={filters.maxAmount}
        onChange={onFilterChange}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={onFilterChange}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={onFilterChange}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default TransactionFilters;
