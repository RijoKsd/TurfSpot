import { useNavigate, useParams } from "react-router-dom";
import useTurfData from "../hooks/useTurfData";
import Reviews from "./Reviews";
import TurfDetailsSkeleton from "./TurfDetailsSkeleton";
  import { useSelector } from "react-redux";

const TurfDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, turfs } = useTurfData();

  // useEffect(() => {
  //   fetchTurfData();
  // }, []);

  if (loading) {
    return <TurfDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
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
    }
    else {
      navigate(`/login`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col h-full">
          <div className="card bg-base-100 shadow-xl flex-grow">
            <figure className="h-full">
              <img
                src={turf.image || "/api/placeholder/800/600"}
                alt={turf.name}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="card bg-base-100 shadow-xl flex-grow">
            <div className="card-body flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="card-title text-2xl">{turf.name}</h2>
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        checked={star === 3}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm opacity-70 mb-4">{turf.location}</p>
                <p className="mb-6">{turf.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <InfoItem
                    label="Price per Hour"
                    value={`$${turf.pricePerHour}`}
                  />
                  <InfoItem label="Sports" value={turf.sportTypes.join(", ")} />
                  <InfoItem label="Open Time" value={turf.openTime} />
                  <InfoItem label="Close Time" value={turf.closeTime} />
                </div>
              </div>
              <div className="card-actions">
                <button
                  className="btn btn-primary w-full"
                  onClick={handleReservation}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Reviews turfId={id} />
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm font-semibold">{label}</p>
    <p className="text-lg">{value}</p>
  </div>
);

export default TurfDetails;
