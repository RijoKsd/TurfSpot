import { Star } from "lucide-react";
import { useState } from "react";

const WriteReview = ({
  rating,
  review,
  isSubmitting,
  onClose,
  onRatingChange,
  onReviewChange,
  onSubmit,
}) => {
  const [ratingError, setRatingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if a rating has been selected
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setRatingError(false);
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  onClick={() => onRatingChange(star)}
                />
              ))}
            </div>
            {ratingError && (
              <div className="text-red-500 text-sm mt-2">
                Please select a rating.
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              id="review"
              rows="4"
              className="textarea textarea-bordered w-full"
              value={review}
              onChange={onReviewChange}
              placeholder="Write your review here..."
              title="Please enter your review"
              
            ></textarea>
          
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
