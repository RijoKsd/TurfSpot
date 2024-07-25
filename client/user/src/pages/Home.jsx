 
import { Link } from "react-router-dom";
// import bg from "../assets/bg.jpeg"

const Home = () => {
  return (
    <div className="hero min-h-screen  relative">
      {/* Semi-transparent overlay
      <div className="absolute inset-0 bg-base-200 dark:bg-base-300 opacity-80"></div> */}

      <div className="hero-content text-center relative z-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-base-content mb-6">
            Welcome to TurfSpot
          </h1>
          <p className="py-6 text-base-content/80">
            Discover and book the best turf fields in your area. Whether you&#39;re
            planning a casual game or a tournament, TurfSpot has got you
            covered.
          </p>
          <Link to="/signup" className="btn btn-accent">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
