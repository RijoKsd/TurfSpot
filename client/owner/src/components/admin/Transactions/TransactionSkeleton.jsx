const TransactionSkeleton = () => {
  return (
    <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-base-200">
        <div className="skeleton h-8 w-64 mb-4"></div>
        <div className="flex flex-wrap gap-4 mb-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton h-12 w-full max-w-xs"></div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {[...Array(6)].map((_, index) => (
                <th key={index}>
                  <div className="skeleton h-4 w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(6)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <div className="skeleton h-4 w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionSkeleton;
