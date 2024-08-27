const TurfCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse ">
      <div className="h-48 bg-base-300"></div>
      <div className="card-body">
        <div className="h-6 bg-base-300 rounded w-3/4"></div>
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-6 bg-base-300 rounded w-16"></div>
          <div className="h-6 bg-base-300 rounded w-16"></div>
        </div>
        <div className="h-4 bg-base-300 rounded w-1/2 mt-2"></div>
        <div className="card-actions justify-end mt-4">
          <div className="h-10 bg-base-300 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default TurfCardSkeleton;
