import useTransactionData from "@hooks/admin/useTransactionData";
import TransactionSkeleton from "./TransactionSkeleton";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import useTransactionManagement from "@hooks/admin/useTransactionManagement.jsx";

const TransactionSection = () => {
  const { transactions, loading, error } = useTransactionData();

  const {
    filters,
    sortField,
    sortDirection,
    filteredAndSortedTransactions,
    handleFilterChange,
    toggleSort,
  } = useTransactionManagement(transactions);

  if (loading) return <TransactionSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  return (
    <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-base-200">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <TransactionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <TransactionTable
        transactions={filteredAndSortedTransactions}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={toggleSort}
      />
    </div>
  );
};

export default TransactionSection;
