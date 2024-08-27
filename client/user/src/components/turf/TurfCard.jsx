import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="card bg-base-100 shadow-xl animate-bounce-fade-in">
      <figure>
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{turf.name}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {turf.sportTypes.map((sport, index) => (
            <span key={index} className="badge badge-outline">
              {sport}
            </span>
          ))}
        </div>
        <p className="mt-2">
          Open: {turf.openTime} - {turf.closeTime}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link
            to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
