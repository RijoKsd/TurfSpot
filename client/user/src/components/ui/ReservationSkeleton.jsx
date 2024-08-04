 
const ReservationSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          {/* Date selection skeleton */}
          <div className="flex flex-col space-y-4 mb-6">
            <div className="w-full">
              <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="h-10 w-full sm:w-28 bg-gray-300 rounded"></div>
              <div className="h-10 w-32 bg-gray-300 rounded"></div>
              <div className="h-10 w-full sm:w-28 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Available start times skeleton */}
          <div>
            <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
              {[...Array(18)].map((_, index) => (
                <div key={index} className="h-8 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Duration selection skeleton */}
          <div className="mt-6">
            <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 bg-gray-300 rounded flex-1"
                ></div>
              ))}
            </div>
          </div>

          {/* Selected time summary skeleton */}
          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-300 rounded mb-2 w-3/4"
              ></div>
            ))}
          </div>

          {/* Confirm reservation button skeleton */}
          <div className="mt-6">
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSkeleton;
