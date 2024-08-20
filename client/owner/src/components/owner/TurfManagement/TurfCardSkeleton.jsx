const TurfCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl h-full animate-pulse">
      <div className="px-4 pt-4">
        <div className="h-48 bg-gray-300 rounded-xl"></div>
      </div>
      <div className="card-body p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="flex justify-end mt-4">
          <div className="h-8 bg-gray-300 rounded w-20 mr-2"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};


export default TurfCardSkeleton;