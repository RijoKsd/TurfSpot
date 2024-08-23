const DashboardSkeleton = () => {
  return (
    <div className="p-4 md:p-6 bg-base-200 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-base-300 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-base-100 p-4 rounded-lg shadow-lg">
              <div className="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-base-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-base-100 p-4 rounded-lg shadow-lg h-64"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
