import  { useState } from "react";
import useReviews from "../../hooks/useReviews";
import { format } from "date-fns";
import ReviewSkeleton from "../ui/ReviewSkeleton";
import { ChevronDown } from "lucide-react";

const REVIEWS_PER_PAGE = 5;

const Reviews = ({ turfId }) => {
  const { reviews, loading } = useReviews(turfId);
  const [displayCount, setDisplayCount] = useState(REVIEWS_PER_PAGE);

  if (loading) return <ReviewSkeleton />;

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + REVIEWS_PER_PAGE);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.slice(0, displayCount).map((review) => (
              <div key={review._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">
                      {review.user.name || "Anonymous"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                  <div className="rating rating-md">
                    {[...Array(review.rating)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${review._id}`}
                        className="mask mask-star-2 bg-orange-400 cursor-auto"
                        readOnly
                        disabled
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 break-all">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {displayCount < reviews.length && (
            <div className="text-center mt-6">
              <button
                className="btn btn-primary btn-outline"
                onClick={handleLoadMore}
              >
                Load More
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;
