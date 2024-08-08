import useReviews from "../../hooks/useReviews";
import { format } from "date-fns";
import ReviewSkeleton from "../ui/ReviewSkeleton";

const Reviews = ({ turfId }) => {
  const { reviews, loading } = useReviews(turfId);

  if (loading) return <ReviewSkeleton />;
    
   

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{review.user.name || "Anonymous"}</div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(review.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
                <div className="rating rating-md">
                  {[...Array(review.rating)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${review.id}`}
                      className="mask mask-star-2 bg-orange-400"
                    />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
