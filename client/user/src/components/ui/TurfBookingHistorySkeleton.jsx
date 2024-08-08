
const TurfBookingHistorySkeleton = () => {
  return (
    <div className="container mx-auto p-4 bg-base-200 animate-pulse">
      <div className="h-8 bg-base-300 rounded w-3/4 mx-auto mb-8  "></div>
      {[1, 2, 3].map((item) => (
        <div key={item} className="card bg-base-100 shadow-xl mb-6 mx-auto lg:w-1/2">
          <div className="card-body">
            <div className="h-6 bg-base-300 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {[1, 2, 3, 4].map((line) => (
                  <div key={line} className="flex items-center">
                    <div className="w-4 h-4 bg-base-300 rounded-full mr-2"></div>
                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-32 h-32 bg-base-300 rounded mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-1/2"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-10 bg-base-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TurfBookingHistorySkeleton;
