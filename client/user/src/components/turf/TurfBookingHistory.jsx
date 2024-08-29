import { Clock, MapPin, IndianRupee, Calendar } from "lucide-react";
import useBookingHistory from "../../hooks/useBookingHistory";
import useWriteReview from "../../hooks/useWriteReview";
import TurfBookingHistorySkeleton from "../../components/ui/TurfBookingHistorySkeleton";
import WriteReview from "../../components/reviews/WriteReview";

const TurfBookingHistory = () => {
  const { loading, bookings } = useBookingHistory();
  const {
    isReviewModalOpen,
    rating,
    review,
    isSubmitting,
    openReviewModal,
    closeReviewModal,
    handleRatingChange,
    handleReviewChange,
    submitReview,
  } = useWriteReview();

  if (loading) {
    return <TurfBookingHistorySkeleton />;
  }

  return (
    <div className="container mx-auto p-4 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Turf Booking History
      </h1>
      <div className="space-y-6 mx-auto lg:w-1/2">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="card bg-base-100 shadow-xl animate-bounce-fade-in"
          >
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-4">{booking.turf.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="flex items-center">
                    <MapPin className="mr-2" /> {booking.turf.location}
                  </p>
                  <p className="flex items-center">
                    <Calendar className="mr-2" /> {booking.timeSlot.date}
                  </p>
                  <p className="flex items-center">
                    <Clock className="mr-2" />{" "}
                    {booking.timeSlot.formattedStartTime} -{" "}
                    {booking.timeSlot.formattedEndTime}
                  </p>
                  <p className="flex items-center">
                    <IndianRupee className="mr-2" />
                    {booking.totalPrice}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={booking.qrCode}
                    alt="Booking QR Code"
                    className="w-32 h-32 mb-2"
                  />
                  <p className="text-sm text-gray-500">Scan for details</p>
                </div>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={() => openReviewModal(booking.turf._id)}
              >
                Write a Review
              </button>
            </div>
          </div>
        ))}
      </div>
      {isReviewModalOpen && (
        <WriteReview
          rating={rating}
          review={review}
          isSubmitting={isSubmitting}
          onClose={closeReviewModal}
          onRatingChange={handleRatingChange}
          onReviewChange={handleReviewChange}
          onSubmit={submitReview}
        />
      )}
    </div>
  );
};

export default TurfBookingHistory;
