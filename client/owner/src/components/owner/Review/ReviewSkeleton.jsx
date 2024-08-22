 
const ReviewsSkeleton = () => {
  return (
    <div className="p-4">
      <div className="h-8 bg-base-300 rounded w-1/4 mb-4"></div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <div className="bg-base-200 rounded-box p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-base-300 rounded mb-2"></div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow-xl mb-4">
              <div className="card-body">
                <div className="h-6 bg-base-300 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-base-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSkeleton;
