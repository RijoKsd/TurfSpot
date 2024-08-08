import { useState } from "react";
import axiosInstance from "./useAxiosInstance";

const useWriteReview = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [turfId, setTurfId] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openReviewModal = (bookingId) => {
    setTurfId(bookingId);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setTurfId(null);
    setRating(0);
    setReview("");
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = async () => {
    if (!turfId) return;

    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
     const response = await axiosInstance.post(`/api/user/review/${turfId}`, {
       rating,
       review,
     });
     console.log(response, "response");

      closeReviewModal();
      // You might want to trigger a refresh of the bookings here
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isReviewModalOpen,
    rating,
    review,
    isSubmitting,
    openReviewModal,
    closeReviewModal,
    handleRatingChange,
    handleReviewChange,
    submitReview,
  };
};

export default useWriteReview;
