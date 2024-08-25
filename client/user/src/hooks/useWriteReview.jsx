import { useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useWriteReview = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [turfId, setTurfId] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      const result = await response.data;
      toast.success(result.message);
      closeReviewModal();
      navigate(`/auth/turf/${turfId}`);
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
