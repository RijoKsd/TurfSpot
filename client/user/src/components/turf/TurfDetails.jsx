import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useTurfData from "../../hooks/useTurfData";
import useReviews from "../../hooks/useReviews";
import Reviews from "../reviews/Reviews";
import TurfDetailsSkeleton from "../ui/TurfDetailsSkeleton";
import { MapPin, Clock, Activity, IndianRupee } from "lucide-react";

const TurfDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, turfs } = useTurfData();
  const { averageRating } = useReviews(id);

  if (loading) {
    return <TurfDetailsSkeleton />;
  }

  const turf = turfs.find((t) => t._id === id);

  if (!turf) {
    return (
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Turf not found</span>
        </div>
      </div>
    );
  }

  const handleReservation = () => {
    if (isLoggedIn) {
      navigate(`/auth/reserve/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in-left">
        <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={turf.image || "/banner-1.png"}
              alt={turf.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-3xl font-bold text-white">{turf.name}</h2>
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{turf.location}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-100 shadow-xl rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-2xl font-bold">Rating</h3>
            <div className="rating rating-md">
              {averageRating ? (
                [1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked={star === Math.round(averageRating)}
                    readOnly
                  />
                ))
              ) : (
                <p className="text-sm opacity-70">No reviews yet</p>
              )}
            </div>
            {averageRating && (
              <span className="text-lg">({averageRating.toFixed(1)})</span>
            )}
          </div>
          <p className="text-lg mb-6">{turf.description}</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <InfoItem
              icon={<IndianRupee />}
              label="Price per Hour"
              value={`₹ ${turf.pricePerHour}`}
            />
            <InfoItem
              icon={<Activity />}
              label="Sports"
              value={turf.sportTypes.join(", ")}
            />
            <InfoItem
              icon={<Clock />}
              label="Open Time"
              value={turf.openTime}
            />
            <InfoItem
              icon={<Clock />}
              label="Close Time"
              value={turf.closeTime}
            />
          </div>
          <div className="card-actions">
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={handleReservation}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
         <Reviews turfId={id} />
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-primary bg-opacity-10 p-3 rounded-full">
      {React.cloneElement(icon, { className: "w-6 h-6 text-primary" })}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  </div>
);

export default TurfDetails;
