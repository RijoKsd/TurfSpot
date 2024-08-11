const TurfSkeleton = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl animate-pulse ">
      <div className="h-48 bg-gray-300"></div>
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
      </div>
    </div>
  );
};

export default TurfSkeleton;
