import { Star, Clock, MapPin, IndianRupee, Calendar } from "lucide-react";
import useBookingHistory from "../../hooks/useBookingHistory";
import TurfBookingHistorySkeleton from "../../components/ui/TurfBookingHistorySkeleton";

const TurfBookingHistory = ({ onReviewClick }) => {
  const { loading, bookings } = useBookingHistory();

  if (loading) {
    return <TurfBookingHistorySkeleton />;
  }

  return (
    <div className="container mx-auto p-4 bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Turf Booking History
      </h1>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
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
                    <Clock className="mr-2" /> {booking.timeSlot.formattedStartTime} -{" "}
                    {booking.timeSlot.formattedEndTime}
                    
                  </p>
                  <p className="flex items-center">
                    <IndianRupee className="mr-2" />{booking.totalPrice}
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
              {booking.review ? (
                <div className="mt-4 p-4 bg-base-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Your Review</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < booking.review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p>{booking.review.comment}</p>
                </div>
              ) : (
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => onReviewClick(booking.id)}
                >
                  Write a Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurfBookingHistory;
