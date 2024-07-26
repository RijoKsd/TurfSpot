const TurfDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="skeleton h-8 w-3/4"></div>
            <div className="skeleton h-4 w-1/2"></div>
            <div className="skeleton h-20 w-full"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-8 w-full"></div>
                </div>
              ))}
            </div>
            <div className="skeleton h-10 w-1/3 ml-auto mt-4"></div>
          </div>
        </div>
        <div className="skeleton h-8 w-1/4"></div>
      </div>
    </div>
  </div>
);


export default TurfDetailsSkeleton;