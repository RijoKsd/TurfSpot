import React from "react";
import Avatar from "react-avatar";
import { ChevronUp, ChevronDown } from "lucide-react";

const TransactionTable = ({
  transactions,
  sortField,
  sortDirection,
  onSort,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>
              <button
                className="flex items-center"
                onClick={() => onSort("createdAt")}
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
                onClick={() => onSort("totalPrice")}
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
          {transactions.map((transaction) => (
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
  );
};

export default TransactionTable;
