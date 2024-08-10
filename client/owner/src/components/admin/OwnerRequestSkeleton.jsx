const OwnerRequestsSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Owner Requests
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card bg-base-100 shadow-xl animate-pulse">
            <div className="card-body">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
              <div className="card-actions justify-end mt-4">
                <div className="h-8 w-20 bg-gray-300 rounded mr-2"></div>
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerRequestsSkeleton;
