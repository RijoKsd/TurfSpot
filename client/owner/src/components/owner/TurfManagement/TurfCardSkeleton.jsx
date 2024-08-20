const TurfCardSkeleton = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="flex justify-end mt-4">
          <div className="h-10 bg-gray-300 rounded w-24 mr-2"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default TurfCardSkeleton;
