 import { Star } from "lucide-react";
import useOwnerReviews from "@hooks/owner/useOwnerReviews";
import ReviewsSkeleton from "./ReviewSkeleton"
const OwnerReviews = () => {
  const { turfs, selectedTurf, setSelectedTurf, loading, error } =
    useOwnerReviews();

  if (loading) return <ReviewsSkeleton />;
  if (error) return <div className="text-error p-4">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Turf Reviews</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <ul className="menu bg-base-200 w-full rounded-box">
            {turfs.map((turf) => (
              <li key={turf.id}>
                <a
                  className={selectedTurf === turf.id ? "active" : ""}
                  onClick={() => setSelectedTurf(turf.id)}
                >
                  <span>{turf.name}</span>
                  <span className="badge badge-sm">
                    <Star size={12} className="text-yellow-400 mr-1" />
                    {turf.avgRating.toFixed(1)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-2/3">
          {selectedTurf ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {turfs.find((t) => t.id === selectedTurf).name} Reviews
              </h2>
              <div className="space-y-4">
                {turfs
                  .find((t) => t.id === selectedTurf)
                  .reviews.map((review) => (
                    <div key={review.id} className="card bg-base-100 shadow-xl">
                      <div className="card-body">
                        <div className="flex justify-between items-center">
                          <h3 className="card-title text-lg">
                            {review.userName}
                          </h3>
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" />
                            <span>{review.rating}</span>
                          </div>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Select a turf to view its reviews
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerReviews;
