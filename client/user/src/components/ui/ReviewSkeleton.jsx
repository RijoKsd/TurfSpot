 
const ReviewSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            <div className="h-5 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="text-sm text-gray-500">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
        <div className="rating rating-md">
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="radio"
              name={`rating-${i}`}
              className="mask mask-star-2 bg-orange-400 opacity-30"
            />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
