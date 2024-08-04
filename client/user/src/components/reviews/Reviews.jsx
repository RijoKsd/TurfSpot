import   { useEffect, useState } from "react";
import axiosInstance from "../../hooks/useAxiosInstance";

const Reviews = ({ turfId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/api/turf/${turfId}/reviews`);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [turfId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-4 bg-gray-100 p-4 rounded">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.username}</span>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
