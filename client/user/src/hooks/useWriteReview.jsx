import { useState } from "react";
import axios from "axios"; // Assuming you're using axios for API calls

const useWriteReview = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const openReviewModal = (bookingId) => {
    setCurrentBookingId(bookingId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setCurrentBookingId(null);
    setRating(0);
    setReview("");
    setError(null);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = async () => {
    if (!currentBookingId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      await axios.post("/api/reviews", {
        bookingId: currentBookingId,
        rating,
        review,
      });

      closeReviewModal();
      // You might want to trigger a refresh of the bookings here
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isReviewModalOpen,
    rating,
    review,
    isSubmitting,
    error,
    openReviewModal,
    closeReviewModal,
    handleRatingChange,
    handleReviewChange,
    submitReview,
  };
};

export default useWriteReview;
